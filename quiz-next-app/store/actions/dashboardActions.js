const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Action types
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';

export const FETCH_ALL_QUIZ_REQUEST = 'FETCH_ALL_QUIZ_REQUEST';
export const FETCH_ALL_QUIZ_SUCCESS = 'FETCH_ALL_QUIZ_SUCCESS';
export const FETCH_ALL_QUIZ_FAILURE = 'FETCH_ALL_QUIZ_FAILURE';

// Action creator to fetch user data with token
export const fetchUser = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_REQUEST });

  // Check if user data exists in localStorage and get the token
  const user = localStorage.getItem('user');
  if (!user) {
    console.log('No user data in localStorage');
    dispatch({
      type: FETCH_USER_FAILURE,
      payload: 'User data not found in localStorage.',
    });
    return;
  }

  const { token } = JSON.parse(user); // Ensure the token key matches your response
  console.log('Fetched Token:', token);

  if (!token) {
    console.log('No token, returning early');
    dispatch({
      type: FETCH_USER_FAILURE,
      payload: 'Token is missing or invalid.',
    });
    return;
  }

  try {
    console.log('Making the fetch request...');
    const response = await fetch(`${API_URL}/api/v1/api-me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    console.log('Response Status:', response.status); // Log status code
    if (!response.ok) {
      console.error('Fetch failed, status:', response.status);
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    console.log('Fetched user data:', data);

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error('Error during fetch:', error); // Log error
    dispatch({
      type: FETCH_USER_FAILURE,
      payload: error.message || 'Something went wrong',
    });
  }
};

export const fetchUserData = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_DATA_REQUEST });

  // Check if user data exists in localStorage and get the token
  const user = localStorage.getItem('user');
  if (!user) {
    console.log('No user data in localStorage');
    dispatch({
      type: FETCH_USER_DATA_FAILURE,
      payload: 'User data not found in localStorage.',
    });
    return;
  }

  const { token } = JSON.parse(user); // Ensure the token key matches your response
  console.log('Fetched Token:', token);

  if (!token) {
    console.log('No token, returning early');
    dispatch({
      type: FETCH_USER_DATA_FAILURE,
      payload: 'Token is missing or invalid.',
    });
    return;
  }

  try {
    console.log('Making the fetch request...');
    const response = await fetch(`${API_URL}/api/v1/quiz-results`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    console.log('Response Status:', response.status); // Log status code
    if (!response.ok) {
      console.error('Fetch failed, status:', response.status);
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    console.log('Fetched user data:', data);

    dispatch({
      type: FETCH_USER_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error('Error during fetch:', error); // Log error
    dispatch({
      type: FETCH_USER_DATA_FAILURE,
      payload: error.message || 'Something went wrong',
    });
  }
};


export const fetchAllQuiz = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_QUIZ_REQUEST });

  // Check if user data exists in localStorage and get the token
  const user = localStorage.getItem('user');
  if (!user) {
    console.log('No user data in localStorage');
    dispatch({
      type: FETCH_ALL_QUIZ_FAILURE,
      payload: 'User data not found in localStorage.',
    });
    return;
  }

  const { token } = JSON.parse(user); // Ensure the token key matches your response
  console.log('Fetched Token:', token);

  if (!token) {
    console.log('No token, returning early');
    dispatch({
      type: FETCH_ALL_QUIZ_FAILURE,
      payload: 'Token is missing or invalid.',
    });
    return;
  }

  try {
    console.log('Making the fetch request...');
    const response = await fetch(`${API_URL}/api/v1/api-quizzes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    console.log('Response Status:', response.status); // Log status code
    if (!response.ok) {
      console.error('Fetch failed, status:', response.status);
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    console.log('Fetched user data:', data);

    dispatch({
      type: FETCH_ALL_QUIZ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error('Error during fetch:', error); // Log error
    dispatch({
      type: FETCH_ALL_QUIZ_FAILURE,
      payload: error.message || 'Something went wrong',
    });
  }
};


