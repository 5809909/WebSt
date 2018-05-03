import React from "react";
import {MenuContainer} from "../containers/menu-container";
import {ListDataContainer} from "../containers/list-data-container";

export const Content = () => {

	return (
		<div className="content">
			<MenuContainer/>
		  <ListDataContainer/>
		</div>

	);
};