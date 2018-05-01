import React, { Component } from "react";
import { Form } from "../components/form/form";
import { List } from "../components/list";

export class ListContainer extends Component {
	handleLike = id => {
        this.props.todosListService.likeItem(id);
	};
	handleUnlike = id => {
        this.props.todosListService.unlikeItem(id);
	};

	handleAddingComment = ({ id, value }) => {
		this.props.todosListService.addItemComment(id, value);
	};

    handleUpdatingItem = value => {

        console.log("todoId1111",value.id);
        console.log("change",value.value);
        this.props.todosListService.updateTodoItem(value.id,value.value);
    };

	handleAddingItem = (data) => {
		this.props.todosListService.createTodoItem(data);
	};

	render() {
		const { list } = this.props;
		return (
			<div>
				<List
					list={list}
					onItemClick={this.handleItemClick}
					onClickLike={this.handleLike}
					onClickUnlike={this.handleUnlike}
					onAddingComment={this.handleAddingComment}
					onUpdatingItem={this.handleUpdatingItem}
				/>
				<Form onChangeInput={this.handleAddingItem} />
			</div>
		);
	}
}
