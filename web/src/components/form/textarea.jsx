import React, {Component} from "react";

export class Textarea extends Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();
	}

	handleClick = () => {
		const {value} = this.input.current;

		if (value) {
			this.input.current.value = "";
			this.props.onChangeInput(value);
		}

	};

	render() {
		return (
			<span>
      <textarea
				className="add-todo__input"
				placeholder="Enter comment here"
				ref={this.input}
			/>
			<button className="add-todo__btn" onClick={this.handleClick}>
	<i className="fa fa-plus"/>
			</button>
      </span>
		);
	}
}
