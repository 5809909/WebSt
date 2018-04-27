import React from "react";
import {Item} from "./item";

export const List = ({list, onItemClick, onClickLike, onAddingComment,onUpdatingItem,onRemoveItem}) => (

    <ul className="todo-list">
        {list.map(item => (
            <Item
                key={item.id}
                {...item}
                onClick={onItemClick}
                onClickLike={onClickLike}
                onAddingComment={onAddingComment}
                onUpdatingItem={onUpdatingItem}
                onRemoveItem={onRemoveItem}

            />
        ))}
    </ul>
);
