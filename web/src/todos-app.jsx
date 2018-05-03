import React, {Component} from "react";
import styles from './components/css/styles.css'
import {Header} from "./components/header";
import {Content} from "./components/content";
import {Footer} from "./components/footer";


export const TodosApp = () => {
	const appTitle = "Todos";
	return (
		<div className="todo-app">
			<Header title={appTitle}/>
			<Content/>
			<Footer/>
		</div>


			// <div>	<Title title={appTitle}/></div>
			// <MenuContainer/>
			// <ListDataContainer/>


	);
};

