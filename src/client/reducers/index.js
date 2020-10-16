const { combineReducers } = require("redux");

import todoReducer from './todo.reducer';
import countryReducer from './country.reducer';

const reducer = combineReducers({
    todos: todoReducer,
    countries: countryReducer
});

export default reducer;