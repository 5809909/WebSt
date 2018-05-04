import React, {Component} from "react";
import {Form} from "../components/form/form";
import {List} from "../components/list";

export class ListContainer extends Component {

    handleLikeItem = id => {
        this.props.todosListService.likeItem(id);
			console.log("is liked");

		};

    handleUnlikeItem = id => {
        this.props.todosListService.unlikeItem(id);
		console.log("is unliked");
    };

    handleCompleteItem = id => {
        this.props.todosListService.completeItem(id);
    };
    handleUncompleteItem = id => {
        this.props.todosListService.uncompleteItem(id);
    };

    handleDeleteItem = id => {
        this.props.todosListService.removeItem(id)
					.then((todosId) => console.log(todosId));
    };

    handleAddingComment = ({id, value}) => {
        this.props.todosListService.addItemComment(id, value);
			console.log(value);

		};

    handleUpdatingItem = value => {
        if (value.value.title) {
            this.props.todosListService.updateTodoItem(value.id, value.value)
							.then((todosId) => console.log(todosId));
        }
    };

    handleAddingItem = (data) => {
        if (data.title) {
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
                    onClickUncompleted={this.handleUncompleteItem}
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
