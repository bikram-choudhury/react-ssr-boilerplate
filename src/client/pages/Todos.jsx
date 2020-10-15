import React, { Fragment, useEffect } from "react";
import PropTypes from 'prop-types';
import { fetchTodos } from '../actions';
import { connect } from "react-redux";

function Todos(props) {
    const { fetchTodos, todos } = props;

    useEffect(() => {
        if (!todos.length) {
            fetchTodos();
        }
    }, [fetchTodos]);

    const renderTodos = () => {
        const left = [];
        const right = [];

        for (let index = 0; index < todos.length; index++) {
            if (index % 2 === 0)
                left.push(
                    <a
                        key={todos[index].id}
                        href="#!"
                        className="collection-item"
                        onClick={(e) => e.preventDefault()}
                    >
                        <span className="new badge" data-badge-caption={todos[index].completed}></span>
                        {todos[index].title}
                    </a>
                );
            else
                right.push(
                    <a
                        key={todos[index].id}
                        href="#!"
                        className="collection-item"
                        onClick={(e) => e.preventDefault()}
                    >
                        <span className="new badge" data-badge-caption={todos[index].completed}></span>
                        {todos[index].title}
                    </a>
                );
        }
        return (
            <div className="collection">
                <div className="row">
                    <div className="col s12 m6">{left}</div>
                    <div className="col s12 m6">{right}</div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <h2>Todos</h2>
            {renderTodos()}
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
