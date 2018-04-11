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
                <input class="add-todo__input" ref={this.valueInput} />
                <button class="add-todo__btn" onClick={this.handleClick}>
                    <i class="fa fa-plus" />
                </button>
            </div>
        );
    }
}
