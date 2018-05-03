import React, { Component } from "react";
import styles from "./style.css";

const Title = ({ title }) => <h1 className="todo-title">{title}</h1>;

class AddTodo extends Component {
	handleClick = input => {
		console.log("value", input.target.value);
		const value = input.target.value;
		this.props.onChangeInput(value);
	};

	render() {
		return (
			<div className="add-todo">
				<input className="add-todo__input_title" onChange={this.handleClick} />
				<button className="add-todo__btn">
					<i className="fa fa-plus" />
				</button>
			</div>
		);
	}

}
const Filters = () => (
	<div className="filters">
		<a className="filter__link" href="#">
			<i className="fa fa-list-ul" />
		</a>
		<a className="filter__link" href="#">
			<i className="fa fa-times" />
		</a>
		<a className="filter__link" href="#">
			<i className="fa fa-check" />
		</a>
	</div>
);

class TodoItem extends Component {
	render() {
		const { content } = this.props;
		return (
			<li className="todo">
				<span className="todo__content">{content}</span>
			</li>
		);
	}
}

const List = ({ list }) => {
	return (
		<ul className="todo-list">
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
		<div className="todo-app">
			<Title title={appTitle} />
			<TodoListContainer />
		</div>
	);
};
