import React, {Component} from "react";
import {Form} from "../components/form/form";
import {List} from "../components/list";

export class ListContainer extends Component {
    handleLike = id => {
        this.props.todosListService.likeItem(id);
    };
    handleUnlike = id => {
        this.props.todosListService.unlikeItem(id);
    };
    handleCompleted = id => {
        this.props.todosListService.completeItem(id);
    };
    handleUncompleted = id => {
        this.props.todosListService.uncompleteItem(id);
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
                    onClickCompleted={this.handleCompleted}
                    onClickUncompleted={this.handleUncompleted}
                    onClickLike={this.handleLike}
                    onClickUnlike={this.handleUnlike}
                    onAddingComment={this.handleAddingComment}
                    onUpdatingItem={this.handleUpdatingItem}
                />
                <Form onChangeInput={this.handleAddingItem}/>
            </div>
        );
    }
}
