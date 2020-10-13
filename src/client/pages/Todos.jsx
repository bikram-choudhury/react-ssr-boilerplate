import React, { Fragment, useEffect, useState } from "react";
import { getTodos } from "../api";

function Todos({ staticContext = {} }) {
    const [todos, setTodos] = useState(
        staticContext.data ? staticContext.data : window.__PRELOADED_DATA__
    );

    useEffect(() => {
        if (!(todos && todos.length)) {
            getTodos().then(data => setTodos(data));
        }
    }, []);

    return (
        <Fragment>
            <h2>Todos</h2>
            <ul>
                {
                    todos.map(todo => (<li key={todo.id}>{todo.title}</li>))
                }
            </ul>
        </Fragment>
    );
}

export default { component: Todos, loadData: getTodos };
