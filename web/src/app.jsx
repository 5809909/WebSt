import React from 'react';
import $ from 'jquery';

class App extends React.Component {
    state = {users: []}

    componentDidMount() {
        fetch('http://localhost:8081/todos')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    render() {
        return (
            <div className="App">
                <h1>Users</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.username}</div>
                )}
            </div>
        );
    }
}

export default App;