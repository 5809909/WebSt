import React, {Component} from "react";
import styles from './components/css/styles.css'
import {Header} from "./components/header";
import {Footer} from "./components/footer";
import {ListDataContainer} from "./containers/list-data-container";


export const TodosApp = () => {

	return (
		<div >
			<Header />
			<ListDataContainer/>
			<Footer/>
		</div>


			// <div>	<Title title={appTitle}/></div>
			// <MenuContainer/>
			// <ListDataContainer/>


	);
};

