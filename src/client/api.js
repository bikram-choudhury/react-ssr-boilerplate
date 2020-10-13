import Axios from 'axios';

export const getTodos = () => Axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(({ data }) => data.filter((_, idx) => idx < 10))