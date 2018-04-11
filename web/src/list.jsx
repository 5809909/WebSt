import React from "react";
import { Item } from "./item";

export const List = ({ list, onItemClick }) => {
    console.log("List");
    return (
        <ul class="todo-list">
            {list.map(({ id, title, description, completed }) => (
                <Item
                    key={id}
                    title={title}
                    description={description}
                    completed={completed}
                    onClick={() => onItemClick(id)}
                />
            ))}
        </ul>
    );
};
