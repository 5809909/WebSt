import React, { Component } from "react";
import { Form } from "./form";
import { List } from "./list";
import { Filters } from "./filters";
import { data } from "./data";

export class ListContainer extends Component {
    state = {
        list: []
    };

    componentWillMount() {
        this.setState({ list: data });
    }

    handleItemClick = id => {
        const { list } = this.state;

        const selectedIndex = list.findIndex(item => {
            return item.id === id;
        });

        list[selectedIndex].completed = !list[selectedIndex].completed;
        this.setState(state => ({
            list: [...list]
        }));
    };

    handleChangeInput = value => {
        const newItem = {id: value, title: value, completed: false};
        this.setState(({ list }) => ({ list: [...list, newItem] }));
    };

    render() {
        const { list } = this.state;
        console.log("render newList", list);
        return (
            <div>
                <List list={list} onItemClick={this.handleItemClick} />
                <Form onChangeInput={this.handleChangeInput} />
                <Filters />
            </div>
        );
    }
}
