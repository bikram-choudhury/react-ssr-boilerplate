import React, { Fragment, useEffect } from "react";
import PropTypes from 'prop-types';
import { fetchTodos } from '../actions';
import { connect } from "react-redux";

function Todos(props) {
    const { fetchTodos, todos } = props;

    useEffect(() => {
        if (!(todos && todos.length)) {
            fetchTodos();
        }
    }, [fetchTodos]);

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

Todos.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.any),
    fetchTodos: PropTypes.func
};

Todos.defaultProps = {
    todos: [],
    fetchTodos: null
};

const loadData = store => {
    // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
    // So we need to use store itself to load data
    return store.dispatch(fetchTodos()); // Manually dispatch a network request
}

const mapStateToProps = (state) => ({ todos: state.todos });

const mapDispatchToProps = { fetchTodos };

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(Todos),
    loadData
};
