// reducer.js
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_ALL_QUIZ_REQUEST,FETCH_ALL_QUIZ_SUCCESS, FETCH_ALL_QUIZ_FAILURE } from '../actions/dashboardActions';

const initialState = {
  loading: false,
  userData: null,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ALL_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quizData: action.payload,
      };
    case FETCH_ALL_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
