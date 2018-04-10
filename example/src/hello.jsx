import React, { Component } from "react";
import styles from "./style.css";

const Title = ({ title }) => <h1 class="todo-title">{title}</h1>;

class AddTodo extends Component {
	handleClick = input => {
		console.log("value", input.target.value);
		const value = input.target.value;
		this.props.onChangeInput(value);
	};

	render() {
		return (
			<div class="add-todo">
				<input class="add-todo__input" onChange={this.handleClick} />
				<button class="add-todo__btn">
					<i class="fa fa-plus" />
				</button>
			</div>
		);
	}
}
const Filters = () => (
	<div class="filters">
		<a class="filter__link" href="#">
			<i class="fa fa-list-ul" />
		</a>
		<a class="filter__link" href="#">
			<i class="fa fa-times" />
		</a>
		<a class="filter__link" href="#">
			<i class="fa fa-check" />
		</a>
	</div>
);

class TodoItem extends Component {
	render() {
		const { content } = this.props;
		return (
			<li class="todo">
				<span class="todo__content">{content}</span>
			</li>
		);
	}
}

const List = ({ list }) => {
	return (
		<ul class="todo-list">
			{list.map((item, index) => <TodoItem key={item} content={item} />)}
		</ul>
	);
};

class TodoListContainer extends Component {
	state = {
		list: ["Do some work 1", "Do some work 2", "Do some work 3"]
	};

	handleChangeInput = value => {
		this.setState(({ list }) => ({ list: [...list, value] }));
	};

	render() {
		const { list } = this.state;
		console.log("render newList", list);
		return (
			<div>
				<List list={list} />
				<AddTodo onChangeInput={this.handleChangeInput} />
				<Filters />
			</div>
		);
	}
}

export default ({ name }) => {
	const appTitle = "Todos";
	return (
		<div class="todo-app">
			<Title title={appTitle} />
			<TodoListContainer />
		</div>
	);
};
