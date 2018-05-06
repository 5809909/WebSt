import React from 'react';
import {Item} from './item';
import PropTypes from 'prop-types';
import {noop} from '../../utils';
import Placeholder from './placeholder';

export const List = ({
                         list, onClickCompleted,onClickUncompleted, onClickLike, onClickUnlike, onAddingComment, onUpdatingItem, onRemoveItem
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
                    onClickUncompleted={onClickUncompleted}
                    onClickLike={onClickLike}
                    onClickUnlike={onClickUnlike}
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
    onClickUncompleted: PropTypes.func,
    onClickLike: PropTypes.func,
    onClickUnlike: PropTypes.func,
    onAddingComment: PropTypes.func,
    onUpdatingItem: PropTypes.func,
    onRemoveItem: PropTypes.func,
};

List.defaultProps = {
    list: [],
    onClickCompleted: noop,
    onClickUncompleted: noop,
    onClickLike: noop,
    onClickUnlike: noop,
    onAddingComment: noop,
    onUpdatingItem: noop,
    onRemoveItem: noop,
};

