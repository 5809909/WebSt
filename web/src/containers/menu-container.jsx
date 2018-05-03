import React, {Component} from "react";
import {Form} from "../components/form/form";
export class MenuContainer extends Component{
	handleUpdatingItem = value => {
		const {id, onUpdatingItem} = this.props;
		onUpdatingItem({id, value});
	}
	render() {
	return(

<div className="menu-container">
<Form onChangeInput={this.handleUpdatingItem}/>
</div>
)
}
}