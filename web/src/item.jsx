import React from "react";

export const Item = ({ title, description, completed, onClick }) => (
    <li class={`todo ${completed && "todo--completed"}`}>
    <span onClick={onClick} class="todo__content">
      {title}
    </span>
        <div>{description}</div>
    </li>
);
