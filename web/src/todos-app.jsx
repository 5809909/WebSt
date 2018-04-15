import React, { Component } from "react";
import Form from './components/Form';
import {Title} from "./components/title";
import {List} from "./list";


const apTitle = "Todos Application";

export class TodosApp extends Component{
    render() {
        return(

            <div className="appTodo">
                <Title title={apTitle}/>
                <Form/>

            </div>

        )
    }



}