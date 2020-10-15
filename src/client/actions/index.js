import Axios from "axios";

export const FETCH_TODOS = 'FETCH_TODOS';

export const fetchTodos = () => async dispatch => {
    try {
        const resposne = await Axios.get('https://jsonplaceholder.typicode.com/todos');
        const todos = resposne.data.filter((_, idx) => idx < 10)

        dispatch({ type: FETCH_TODOS, payload: todos })
    } catch (error) {
        console.log(error);
    }
};