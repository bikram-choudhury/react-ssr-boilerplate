import { FETCH_TODOS } from "../actions";

const todoReducer = (state = [], action) => {

    switch (action.type) {
        case FETCH_TODOS:
            return action.payload;
        default: return state;
    }
};

export default todoReducer;