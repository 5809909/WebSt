// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from "react";
import { render } from "react-dom";
import Hello from './hello';

const App = () => (
	<div>
		<Hello />
	</div>
);

render(<App />, document.getElementById("root"));
