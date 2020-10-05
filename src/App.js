import React, { useEffect, useState } from 'react';
import getTodos from './todos';

function App(props) {
    const [todos, setTodos] = useState(props.todos ? props.todos : []);

    useEffect(() => {
        if (window.__ROUTE_DATA__) {
            setTodos(window.__ROUTE_DATA__);
            delete window.__ROUTE_DATA__;
        } else {
            getTodos().then((data) => setTodos(data));
        }
    }, []);

    return (
        <ul>
            {todos.map(todo => {
                return <li key={todo.id}>{todo.title}</li>
            })}
        </ul>
    )
}
export default App;