import Axios from "axios";

export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';

export const fetchTodos = () => async dispatch => {
    try {
        const resposne = await Axios.get('https://jsonplaceholder.typicode.com/todos');
        const todos = resposne.data.filter((_, idx) => idx < 10)

        dispatch({ type: FETCH_TODOS, payload: todos })
    } catch (error) {
        console.log(error);
    }
};

export const fetchCountries = () => async dispatch => {
    try {
        const response = await Axios.get('https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;flag;region;population');
        const countries = response.data.sort((prev, next) => {
            const diff = prev.population - next.population;
            return diff > 0 ? -1 : (diff < 0 ? 1 : 0)
        });

        dispatch({ type: FETCH_COUNTRIES, payload: countries });
    } catch (error) {
        console.log(error);
    }
}