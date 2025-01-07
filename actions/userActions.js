// actions/userActions.js
export const setUser = (userData) => {
    return {
      type: 'SET_USER',
      payload: userData, // userData will contain name, email, and token
    };
  };
  