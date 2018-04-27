import React, { Component } from "react";
import { ListContainer } from "./containers/list-container";
import { Title } from "./components/title";
import styles  from './components/css/styles.css'


export const TodosApp = ({ name }) => {
    const appTitle = "Todos";
    return (
        <div className="todo-app">
            <Title title={appTitle} />
            <ListContainer />
        </div>
    );
};
