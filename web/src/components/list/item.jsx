import React, {PureComponent} from "react";
import {Form} from "../form";
import {Textarea} from "../form";

require('font-awesome/css/font-awesome.css');

export class Item extends PureComponent {
    state = {
        isCommenting: false,
        isUpdating: false
    };

    handleCommenting = () => {
        this.setState(({isCommenting}) => ({isCommenting: !isCommenting}));
    };

    handleUpdating = () => {
        this.setState(({isUpdating}) => ({isUpdating: !isUpdating}));
    };

    handleAddingComment = value => {
        const {id, onAddingComment} = this.props;
        onAddingComment({id, value});
    };
    handleUpdatingItem = value => {
        const {id, onUpdatingItem} = this.props;
        onUpdatingItem({id, value});

    }

    render() {
        const {
            id,
            title,
            description,
            completed,
            comment,
            isLiked,
            onClickCompleted,
            onClickUncompleted,
            onClickLike,
            onClickUnlike,
            onRemoveItem
        } = this.props;
        return (

            <li className={`todo ${completed && "todo--completed"}`}>

        <span onClick={() => completed ? onClickUncompleted(id):onClickCompleted(id)} className="todo__content">
           <i className={`fa  ${completed ? "fa-check-square-o" : "fa fa-square-o"}`}/>
            Title: {title}
        </span>
                <div>Description: {description}</div>

                Comment: {comment}
                <div>
									{this.state.isUpdating && (
                    <Form
                      onChangeInput={this.handleUpdatingItem}
                    />
									)}
                    {this.state.isCommenting && (
                        <Textarea
                            onChangeInput={this.handleAddingComment}
                        />
                    )}
                </div>



                <span>
            <i
                className={`fa fa-heart ${isLiked ? "fa-heart-active" : ""}`}
                onClick={() => isLiked ? onClickUnlike(id):onClickLike(id)}
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
            <i className="fa fa-pencil" onClick={this.handleUpdating}/>
          </span>
                <span>
            <i
                className={"fa fa-trash"}
                onClick={() => onRemoveItem(id)}
            />
          </span>

            </li>
        );
    }
}
