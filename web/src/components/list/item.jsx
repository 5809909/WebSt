import React, {PureComponent} from "react";
import {Form} from "../form";
import {Input} from "../form/input";

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
        this.handleCommenting();
    };

    handleUpdatingItem = value => {
        const {id, onUpdatingItem} = this.props;
        onUpdatingItem({id, value});
        this.handleUpdating();
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

            <li className="todo" >

                <div className="textForm">
                    <span onClick={() => completed ? onClickUncompleted(id) : onClickCompleted(id)}
                          className="todo__icon">
                        <i className={`fa  ${completed ? "fa-check-square-o" : "fa fa-square-o"}`}/>
                    </span>

                    <span className="todo__icon">
                    <i
                        className={`fa fa-heart opacity ${isLiked ? "fa-heart-active" : ""}`}
                        onClick={() => isLiked ? onClickUnlike(id) : onClickLike(id)}
                    />                                 </span>

                    <span className="textTitle">{title}</span>
                    <div >

                        <div className="textDescription">{description}</div>
                        <div className="textComment">{comment}</div>
                    </div>
                    <div className="update-item">
                        {this.state.isUpdating && (
                            <Form
                                onChangeInput={this.handleUpdatingItem}
                            />
                        )}  </div>
                    <div>
                        {this.state.isCommenting && (
                            <Input
                                onChangeInput={this.handleAddingComment}
                            />
                        )}
                    </div>
                </div>

                <div className="todo__icon">
                    <i className="fa fa-pencil" onClick={this.handleUpdating}/>
                    <i
                        className={"fa fa-trash"}
                        onClick={() => onRemoveItem(id)}
                    />
                    {this.state.isCommenting ? (
                        <i className="fa fa-minus" onClick={this.handleCommenting}/>
                    ) : (
                        <i className="fa fa-plus" onClick={this.handleCommenting}/>
                    )}

                </div>

            </li>
        );
    }
}
