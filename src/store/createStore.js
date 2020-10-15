import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk";
import reducer from '../client/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default () => {
    const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk)))
    return store;
}