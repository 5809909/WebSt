import React, {PureComponent} from "react";
import {Textarea} from "./textarea";
import {Form} from "./form"

require('font-awesome/css/font-awesome.css');

export class Item extends PureComponent {
    state = {
        isCommenting: false,
        isEdeting: false
    };

    handleCommenting = () => {
        this.setState(({isCommenting}) => ({isCommenting: !isCommenting}));
    };

    handleEdeting = () => {
        this.setState(({isEdeting}) => ({isEdeting: !isEdeting}));
    }

    handleAddingComment = value => {
        const {id, onAddingComment} = this.props;

        onAddingComment({id, value});
    };
    handleEdetingItem = value => {
        const {id, onEdetingItem} = this.props;
        console.log("value", value);
        onEdetingItem({id, value});
    }

    render() {
        const {
            id,
            title,
            description,
            completed,
            comments,
            isLiked,
            onClick,
            onClickLike,
            onAddingComment,
            onEdetingItem,
            onRemoveItem
        } = this.props;
        return (
            <li className={`todo ${completed && "todo--completed"}`}>
        <span onClick={() => onClick(id)} className="todo__content">
          {title}
        </span>
                <div>{description}</div>
                <p>
          <span>
            <i
                className={`fa fa-heart ${isLiked ? "fa-heart-active" : ""}`}
                onClick={() => onClickLike(id)}
            />
          </span>
                    <span>
            {this.state.isCommenting ? (
                <i className="fa fa-minus" onClick={this.handleCommenting}/>
            ) : (
                <i className="fa fa-plus" onClick={this.handleCommenting}/>
            )}
          </span>
                    <span>
            <i className="fa fa-pencil" onClick={this.handleEdeting}/>
          </span>
                    <span>
            <i
                className={"fa fa-trash"}
                onClick={() => onRemoveItem(id)}
            />
          </span>

                </p>
                {comments &&
                (<p>Comments</p>,
                    <ul>{comments.map(comment => <li>
                        {comment}</li>)}</ul>)}
                {this.state.isCommenting && (
                    <Textarea
                        onChangeInput={this.handleAddingComment}
                    />
                )}
                {this.state.isEdeting && (
                    <Form
                        onChangeInput={this.handleEdetingItem}
                    />
                )}
            </li>
        );
    }
}
