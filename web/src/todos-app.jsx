import React, {Component} from "react";
import styles from './components/css/styles.css'
import {Header} from "./components/header";
import {Footer} from "./components/footer";
import {ListDataContainer} from "./containers/list-data-container";


export const TodosApp = () => {
	const appTitle = "Todos";
	return (
		<div className="todo-app">
			<Header title={appTitle}/>
			<ListDataContainer/>
			<Footer/>
		</div>


			// <div>	<Title title={appTitle}/></div>
			// <MenuContainer/>
			// <ListDataContainer/>


	);
};

