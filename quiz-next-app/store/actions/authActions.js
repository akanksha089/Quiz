import { fetcher } from '../fetcher';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOAD_USER = 'LOAD_USER';

// Check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
    const exp = decoded.exp; // Get expiration time
    return exp < Date.now() / 1000; // Check if expired
  } catch (e) {
    console.error('Failed to decode token:', e);
    return true; // Assume expired if decoding fails
  }
};

// Login action
export const login = (credentials) => async (dispatch) => {
  try {
    console.log('Logging in with:', credentials); // Log the credentials
    const response = await fetcher.post('http://localhost:4000/api/v1/api-login', credentials);

    // Log the entire response to check its structure
    console.log('API response:', response);

    // Check if the response has the expected token
    if (response && response.token) {
      console.log('Saving user data to localStorage:', response);
      localStorage.setItem('user', JSON.stringify({ token: response.token, ...response })); // Save user data including token

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    } else {
      throw new Error('Token not received from the server.');
    }
  } catch (error) {
    console.error('Login failed:', error.message); // Log the error
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
    throw error; // Rethrow the error to be caught in the component
  }
};
export const signUp = (credentials) => async (dispatch) => {
  try {
    const response = await fetcher.post('http://localhost:4000/api/v1/api-register', credentials);

    // Check if the response has the expected token
    if (response && response.token) {
      localStorage.setItem('user', JSON.stringify({ token: response.token, ...response })); 
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response,
      });
    } else {
      throw new Error('Token not received from the server.');
    }
  } catch (error) {
    console.error('Signup failed:', error.message); // Log the error
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error.message,
    });
    throw error; 
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch({
    type: LOGOUT,
  });
};

// Check token and prompt login if expired
export const checkToken = () => (dispatch) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user); // Ensure the token key matches your response
    if (isTokenExpired(token)) {
      dispatch(logout()); // Clear expired token
      return { expired: true };
    }
    dispatch({ type: LOAD_USER, payload: JSON.parse(user) });
  } else {
    console.log('No user found in localStorage');
  }
  return { expired: false };
};

// Load user from local storage
export const loadUserFromLocalStorage = () => (dispatch) => {
  const user = localStorage.getItem('user');
  if (user) {
    // console.log('Loading user from localStorage:', JSON.parse(user));
    dispatch({ type: LOAD_USER, payload: JSON.parse(user) });
  } else {
    console.log('No user found in localStorage');
  }
};
