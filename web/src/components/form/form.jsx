import React, { Component } from "react";

export class Form extends Component {

  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
  }

  handleClick = () => {
    const title = this.titleInput.current.value;
    const description = this.descriptionInput.current.value;
		if (title) {
			this.props.onChangeInput({title, description});
			this.titleInput.current.value="";
			this.descriptionInput.current.value="";
		}
  };

  render() {
    return (
      <div className="add-todo">
				<span className="add-todo__text">Title:</span>
        <input  className="add-todo__input" placeholder="Enter ToDo title" ref={this.titleInput} />
				<span className="add-todo__text">Description:</span>
        <input className="add-todo__input" placeholder="Enter ToDo description" ref={this.descriptionInput} />
        <button  onClick={this.handleClick}>
					<span className="add-todo__btn"><i className="fa fa-floppy-o" /></span>
        </button>
      </div>
    );
  }
}
