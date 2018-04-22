import React, { Component } from "react";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
  }

  handleClick = input => {
    const title = this.titleInput.current.value;
    const description = this.descriptionInput.current.value;
    this.props.onChangeInput({ title, description });
      this.titleInput.current.value="";
      this.descriptionInput.current.value="";
  };

  render() {
    return (
      <div className="add-todo">
        <input  className="add-todo__input" placeholder="Enter ToDo title" ref={this.titleInput} />
        <input className="add-todo__input" placeholder="Enter ToDo description" ref={this.descriptionInput} />
        <button  className="add-todo__btn" onClick={this.handleClick}>
          <i className="fa fa-plus" />
        </button>
      </div>
    );
  }
}
