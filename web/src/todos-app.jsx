import React, { Component } from "react";
import { ListDataContainer } from "./containers/list-data-container";
import { Title } from "./components/title";
import styles  from './components/css/styles.css'


export const TodosApp = ({ name }) => {
	const appTitle = "Todos";
	return (
    <div className="todo-app">
      <Title title={appTitle} />
      <ListDataContainer />
    </div>
	);
};

