const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'UPDATE_IMAGES':
      return { ...state, images: [...state.images, action.payload] };
      
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };

    case 'UPDATE_DETAILS':
      return {...state, details: {...state.details, ...action.payload}} 

    case 'UPDATE_LOCATION':
      return {...state, location: action.payload}

    case 'RESET_GENERATOR':
      return {
        ...state,
        images: [],
        details: {company: '', usageType: '', genType: '', power: '', model: '', serialNumber: '',},
        location: { lng: 0, lat: 0 }}

    case 'UPDATE_GENERATORS':
      return {...state, generators: action.payload, addressFilter: null, filteredGenerators: action.payload }

    case 'FILTER_ADDRESS':
      return {...state, addressFilter: action.payload, filteredGenerators: applyFilter(
        state.generators,
        action.payload,
      ),}

    case 'CLEAR_ADDRESS':
      return {...state, addressFilter: null, filteredGenerators: state.generators}

    case 'UPDATE_GENERATOR':
      return {...state, generator: action.payload}

    default:
      throw new Error('No matched action!');
  }
};

export default reducer;


const applyFilter = (generators, address) => {
  let filteredGenerators = generators;
  if (address) {
    const { lng, lat } = address;
    filteredGenerators = filteredGenerators.filter((generator) => {
      const lngDifference = lng > generator.lng ? lng - generator.lng : generator.lng - lng;
      const latDifference = lat > generator.lat ? lat - generator.lat : generator.lat - lat;
      return lngDifference <= 1 && latDifference <= 1;
    });
  }

  filteredGenerators
};