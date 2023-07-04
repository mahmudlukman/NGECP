import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import { useRef } from 'react';

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false, file: null, photoURL: '' },
  images: [],
  details: { company: '', usageType: '', genType: '', power: '', model: '', serialNumber: '', },
  location: { lng: 0, lat: 0 },
  updatedGenerator: null,
  deletedImages: [],
  addedImages: [],
  generators: [],
  addressFilter: null,
  filteredGenerators: [],
  generator: null,
  users: [],
  section: 0,
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef()
  const containerRef = useRef()
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
    }
  }, []);

  useEffect(() => {
    if (state.currentUser) {
      const generator = JSON.parse(localStorage.getItem(state.currentUser.id))
      if (generator) {
        dispatch({ type: 'UPDATE_LOCATION', payload: generator.location })
        dispatch({ type: 'UPDATE_DETAILS', payload: generator.details })
        dispatch({ type: 'UPDATE_IMAGES', payload: generator.images })
        dispatch({ type: 'UPDATE_UPDATED_GENERATOR', payload: generator.updatedGenerator })
        dispatch({ type: 'UPDATE_DELETED_IMAGES', payload: generator.deletedImages })
        dispatch({ type: 'UPDATE_ADDED_IMAGES', payload: generator.addedImages })
      }
    }
  }, [state.currentUser])
  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>{children}</Context.Provider>
  );
};

export default ContextProvider;