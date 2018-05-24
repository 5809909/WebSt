import React from 'react';
import $ from 'jquery';

class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Title</h1>
         </div>
      );
   }
}

class Content extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        $.ajax({
            url: "http://localhost:8081/todos",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {

                this.setState({data: data});
                console.log(data)     ;
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }.bind(this)
        })
    }
    render() {
        return (
            <table>
                <tbody>{this.state.data.map(function (item, key) {
                return (
                    <tr key={key}>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                    </tr>
                )
            })}</tbody>
            </table>
        )
    }
}


export default App;