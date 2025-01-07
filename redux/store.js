// store.js
import { createStore } from 'redux';

// Initial state for the user
const initialState = {
  user: {
    name: '',
    email: '',
    token: '',
    id:"sf",
  },
};

// Reducer to update the user data in the Redux store
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload, 
      };
    default:
      return state;
  }
};

const store = createStore(userReducer);

export default store;
