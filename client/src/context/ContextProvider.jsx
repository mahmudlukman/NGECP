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
  generators: [],
  addressFilter: null,
  filteredGenerators: [],
  generator: null,
  users: [],
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
  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>{children}</Context.Provider>
  );
};

export default ContextProvider;