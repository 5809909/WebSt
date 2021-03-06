import React, {Component} from "react";

export class Input extends Component {
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
			<div className="addComment">
      <input
				className="add-todo__input"
				placeholder="Enter comment here"
				ref={this.input}
			/>
			<button onClick={this.handleClick}>
	<span className="add-todo__btn"><i className="fa fa-floppy-o "/></span>
			</button>
      </div>
		);
	}
}
