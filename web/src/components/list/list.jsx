import React from 'react';
import {Item} from './item';
import PropTypes from 'prop-types';
import {noop} from '../../utils';
import Placeholder from './placeholder';

export const List = ({
                         list, onItemClick, onClickLike, onClickUnlike, onAddingComment, onUpdatingItem, onRemoveItem
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
                    onClick={onItemClick}
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
    // eslint-disable-next-line react/forbid-prop-types
    list: PropTypes.array,
    onItemClick: PropTypes.func,
    onClickLike: PropTypes.func,
    onClickUnlike: PropTypes.func,
    onAddingComment: PropTypes.func,
    onUpdatingItem: PropTypes.func,
    onRemoveItem: PropTypes.func,
};

List.defaultProps = {
    list: [],
    onItemClick: noop,
    onClickLike: noop,
    onAddingComment: noop,
    onUpdatingItem: noop,
    onRemoveItem: noop,
};

