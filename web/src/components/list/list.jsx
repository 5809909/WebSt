import React from 'react';
import {Item} from './item';
import PropTypes from 'prop-types';
import {noop} from '../../utils';
import Placeholder from './placeholder';

export const List = ({
                         list, onClickCompleted, onClickLike, onAddingComment, onUpdatingItem, onRemoveItem
                     }) => {
    if (!list || !list.length) {
        return <Placeholder/>;
    }

    return (
        <ul className="todo-list">
            {list.map(item => (
                <Item
                    key={item.id}
                    {...item}
                    onClickCompleted={onClickCompleted}
                    onClickLike={onClickLike}
                    onAddingComment={onAddingComment}
                    onUpdatingItem={onUpdatingItem}
                    onRemoveItem={onRemoveItem}
                />
            ))}
        </ul>
    );
};

List.propTypes = {
    list: PropTypes.array,
    onClickCompleted: PropTypes.func,
    onClickLike: PropTypes.func,
    onAddingComment: PropTypes.func,
    onUpdatingItem: PropTypes.func,
    onRemoveItem: PropTypes.func,
};

List.defaultProps = {
    list: [],
    onClickCompleted: noop,
    onClickLike: noop,
    onAddingComment: noop,
    onUpdatingItem: noop,
    onRemoveItem: noop,
};

