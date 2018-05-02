import React, {Component} from "react";
import {Form} from "../components/form/form";
import {List} from "../components/list";

export class ListContainer extends Component {
    handleLikeItem = id => {
        this.props.todosListService.likeItem(id);
    };
    handleUnlikeItem = id => {
        this.props.todosListService.unlikeItem(id);
    };
    handleCompleteItem = id => {
        this.props.todosListService.completeItem(id);
    };
    handleUncompleteItem = id => {
        this.props.todosListService.uncompleteItem(id);
    };
    handleDeleteItem = id => {
        this.props.todosListService.removeItem(id);
    };

    handleAddingComment = ({id, value}) => {
        this.props.todosListService.addItemComment(id, value);
    };

    handleUpdatingItem = value => {
        if (value.value.title) {
            this.props.todosListService.updateTodoItem(value.id, value.value);
        }
    };

    handleAddingItem = (data) => {
        if (data.title) {
        this.props.todosListService.createTodoItem(data);}
    };

    render() {
        const {list} = this.props;
        return (
            <div>
                <List
                    list={list}
                    onClickCompleted={this.handleCompleteItem}
                    onClickUncompleted={this.handleUncompleteItem}
                    onClickLike={this.handleLikeItem}
                    onClickUnlike={this.handleUnlikeItem}
                    onAddingComment={this.handleAddingComment}
                    onUpdatingItem={this.handleUpdatingItem}
                    onRemoveItem={this.handleDeleteItem}
                />
                <Form onChangeInput={this.handleAddingItem}/>
            </div>
        );
    }
}
