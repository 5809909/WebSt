import React, {Component} from "react";
import cuid from "cuid";
import {Form} from "./form";
import {List} from "./list";


export class ListContainer extends Component {
    state = {
        list: []
    };

    componentWillMount() {
        this.getTodosFromStorage();
    }

    componentDidUpdate() {
        this.setCitysToStorage();
    }

    setCitysToStorage() {
        const {list} = this.state;
        console.log({list})
        localStorage.todos = JSON.stringify(list);
    }
    getTodosFromStorage() {

        if (typeof localStorage.todos === 'undefined') {
            localStorage.todos = '[]';
        }

        this.setState({
            list: JSON.parse(localStorage.todos)
        });
    }
    onRemoveItem = id => {
        const {list} = this.state;

        const selectedIndex = list.findIndex(item => {
            return item.id === id;
        });
        list.splice(selectedIndex,1);
        this.setState(state => ({
            list: [...list]
        }));
    };

    handleItemClick = id => {
        const {list} = this.state;

        const selectedIndex = list.findIndex(item => {
            return item.id === id;
        });

        list[selectedIndex].completed = !list[selectedIndex].completed;
        this.setState(state => ({
            list: [...list]
        }));
    };
    handleLike = id => {
        const {list} = this.state;

        const selectedIndex = list.findIndex(item => {
            return item.id === id;
        });

        list[selectedIndex].isLiked = !list[selectedIndex].isLiked;
        this.setState(state => ({
            list: [...list]
        }));
    };
    handleAddingComment = ({id, value}) => {
        const {list} = this.state;

        const selectedIndex = list.findIndex(item => {
            return item.id === id;
        });
        const {comments} = list[selectedIndex];
         console.log("value",value);
        list[selectedIndex].comments = [...comments, value];

        this.setState(state => ({
            list: [...list]

        }));
    };

    handleEdetingItem = ({id,value})=>{
        const {list} = this.state;

        const selectedIndex = list.findIndex(item => {
            return item.id === id;
        });
        const {comments} = list[selectedIndex];
        list[selectedIndex].title = [value.title];
        list[selectedIndex].description = [value.description];

        this.setState(state => ({
            list: [...list]

        }));
    };

    handleAddingItem = ({title, description}) => {
        const newItem = {id: cuid(), title, description, comments:'', completed: false};
        this.setState(({list}) => ({list: [...list, newItem]}));
    };

    render() {
        const {list} = this.state;
        if(!list.length){return(
            <div>NO TODOS
                <Form onChangeInput={this.handleAddingItem}/></div>
                )}
        else return (

            <div>
                {list.length}
                <List
                    list={list}
                    onItemClick={this.handleItemClick}
                    onClickLike={this.handleLike}
                    onAddingComment={this.handleAddingComment}
                    onEdetingItem={this.handleEdetingItem}
                    onRemoveItem={this.onRemoveItem}
                />
                <Form onChangeInput={this.handleAddingItem}/>
            </div>
        );
    }
}
