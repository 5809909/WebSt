import React, { Component } from "react";
import { Container } from "./container";
import { Title } from "./title";

export const TodoApp = ({ name }) => {
  const appTitle = "Todos";
  return (
    <div className="todo-app flex">
      <Title title={appTitle} />
      <Container />
    </div>
  );
};
