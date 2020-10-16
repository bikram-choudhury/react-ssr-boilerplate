import { FETCH_COUNTRIES } from './../actions';

const countryReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_COUNTRIES:
            return action.payload;
        default: return state;
    }
};

export default countryReducer;