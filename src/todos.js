import fetch from 'isomorphic-fetch';

export default function getTodos() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(res => res.filter((_, idx) => idx < 10));
}