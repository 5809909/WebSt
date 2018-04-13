import React, { Component } from "react";

export class Form extends Component {
    constructor(props) {
        super(props);
        this.valueInput = React.createRef();
    }

    handleClick = input => {
        const { value } = this.valueInput.current;
        this.props.onChangeInput(value);
    };

    render() {
        return (
            <div class="add-todo">
             <span> Title:</span>
                <input class="add-todo__input_title" ref={this.valueInput} />

            <span> Description </span>
                <input class="add-todo__input_description" ref={this.valueInput} />
                <button class="add-todo__btn" onClick={this.handleClick}>
                    <i class="fa fa-plus" />
                </button>
            </div>
        );
    }
}
