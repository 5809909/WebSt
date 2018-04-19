import React, { Component } from "react";
import { ListContainer } from "./components/list-container";
import { Title } from "./components/title";
import styles from "./components/styles.css";

export const TodoApp = ({ name }) => {
  const appTitle = "Todos";
  return (
    <div className="todo-app">
      <Title title={appTitle} />
      <ListContainer />
    </div>
  );
};
