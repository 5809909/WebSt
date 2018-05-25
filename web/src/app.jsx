import React from 'react';
import cors from 'cors';
import $ from 'jquery';

class App extends React.Component {
    state = {users: []}

    componentDidMount() {


			fetch("http://localhost:8081/todos", {mode: cors})
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    render() {
        return (
            <div className="App">
                <h1>Users</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.title}</div>
                )}
            </div>
        );
    }
}

export default App;