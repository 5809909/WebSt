import React, {Component} from "react";
import {Form} from "../components/form/form";
import {List} from "../components/list";

export class ListContainer extends Component {

    handleLikeItem = (id,isliked) => {
        this.props.todosListService.likeTodoItem(id,isliked);
		};

    handleCompleteItem = (id,completed) => {
        this.props.todosListService.completeTodoItem(id,completed);
    };

    handleDeleteItem = id => {
        this.props.todosListService.removeTodoItem(id)
            .then((todosId) => console.log(todosId));
    };

    handleAddingComment = ({id, value}) => {
        this.props.todosListService.addTodoItemComment(id, value);
		};

    handleUpdatingItem = value => {
        if (value.value.title) {
            this.props.todosListService.updateTodoItem(value.id, value.value)
							.then((todosId) => console.log(todosId));
        }
    };

    handleAddingItem = (data) => {
        if (data.title) {
            console.log("data"+data.title);
        this.props.todosListService.createTodoItem(data)
        .then((todosId) => console.log(todosId))}
    };

    render() {
        const {list} = this.props;
        return (
            <div className="list-container">
                <Form onChangeInput={this.handleAddingItem}/>
                <List
                    list={list}
                    onClickCompleted={this.handleCompleteItem}
                    onClickLike={this.handleLikeItem}
                    onClickUnlike={this.handleUnlikeItem}
                    onAddingComment={this.handleAddingComment}
                    onUpdatingItem={this.handleUpdatingItem}
                    onRemoveItem={this.handleDeleteItem}
                />

            </div>
        );
    }
}
