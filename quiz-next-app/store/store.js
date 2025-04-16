import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/reducers';
import { createWrapper } from 'next-redux-wrapper';

// Define makeStore as a function that creates the store
const store = () => createStore(rootReducer, applyMiddleware(thunk));

// Pass store function to createWrapper
export const wrapper = createWrapper(store);
export default store;
