import React, { Component } from "react";
import { ListContainer } from "./list-container";
import { Title } from "./title";
import styles from "./styles.css";

export const TodoApp = ({ name }) => {
  const appTitle = "Todos";
  return (
    <div className="todo-app">
      <Title title={appTitle} />
      <ListContainer />
    </div>
  );
};
