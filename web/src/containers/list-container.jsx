import React, {Component} from "react";
import {Form} from "../components/form/form";
import {List} from "../components/list";

import todosListDAO from '../dao/LocalStorageTodosListDAO';
import TodosListService from '../services/TodosListService';

export class ListContainer extends Component {
	state = {
		list: []
	};

	componentWillMount() {
		console.log("willMount");
		this.todosListService = new TodosListService(todosListDAO);
		// const todosF = todosListDAO.getAllTodos().then((todos)=>{
         //    this.setState({list: todos})
		// });

	}

	componentDidMount() {

        const todosF = todosListDAO.getAllTodos().then((todos)=>{
            this.setState({list: todos})
        });
	}


	handleLike = id => {
		this.todosListService.likeItem(id);
	};

	handleAddingComment = ({id, value}) => {
		this.todosListService.addItemComment(id, value);
	};

	handleAddingItem = (data) => {

		this.todosListService.createTodoItem(data);
	};


	render() {
		//	let p= this.todosListService.todosListDAO.getAllTodos();
		console.log("this.state", this.state);
		const {list} = this.state;
		return (
			<div>
				<List
					list={list}
					onItemClick={this.handleItemClick}
					onClickLike={this.handleLike}
					onAddingComment={this.handleAddingComment}
				/>
				<Form onChangeInput={this.handleAddingItem}/>
			</div>
		);
	}
}
