import React, {Component} from "react";
import cuid from "cuid";
import {Form} from "./form";
import {List} from "./list";
import  styles from  "./css/container.css"   ;
//import styles from "../styles.css";



export class Container extends Component {
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
        list.splice(selectedIndex, 1);
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

        list[selectedIndex].comments = [...comments, value];

        this.setState(state => ({
            list: [...list]

        }));
    };

    handleUpdatingItem = ({id, value}) => {
        if (value.title) {
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
        }
    };

    handleAddingItem = ({title, description}) => {
        if (title) {
            const newItem = {id: cuid(), title, description, comments: '', completed: false};
            this.setState(({list}) => ({list: [...list, newItem]}));
        }
    };

    render() {
        const {list} = this.state;
        if (!list.length) {
            return (
                <div>
                    <Form onChangeInput={this.handleAddingItem}/>
                    <p>NO TODOS</p>
                </div>

            )
        }
        else return (

            <div className="container">
                <Form  onChangeInput={this.handleAddingItem}/>
                <List
                    list={list}
                    onItemClick={this.handleItemClick}
                    onClickLike={this.handleLike}
                    onAddingComment={this.handleAddingComment}
                    onUpdatingItem={this.handleUpdatingItem}
                    onRemoveItem={this.onRemoveItem}
                />

            </div>
        );
    }
}
