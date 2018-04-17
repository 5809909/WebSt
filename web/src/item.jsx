import React, {PureComponent} from "react";
import {Textarea} from "./textarea";
import {Form} from "./form"

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
    }

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
            comments,
            isLiked,
            onClick,
            onClickLike,
            onRemoveItem
        } = this.props;
        return (

            <li className={`todo ${completed && "todo--completed"}`}>

        <span onClick={() => onClick(id)} className="todo__content">
           <i className={`fa fa-circle-o ${completed ? "fa-dot-circle-o" : ""}`}/>
            {title}
        </span>
                <div>{description}</div>

                {comments &&
                (<p>Comments</p>,
                    <ul>{comments.map(comment => <li key={comment}>
                        {comment}</li>)}</ul>)}
                <div>
                    {this.state.isCommenting && (
                        <Textarea
                            onChangeInput={this.handleAddingComment}
                        />
                    )}
                </div>


                {this.state.isUpdating && (
                    <Form
                        onChangeInput={this.handleUpdatingItem}
                    />
                )}
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
