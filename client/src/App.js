import React from 'react';
import './App.css';
import Header from "./components/Header";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  /*callAPI() {
    fetch("http://localhost:9000/api/users")
        .then(res => res.json())
        .then(data => {
          const list = document.querySelector('ul');
          for (const user of data.data) {
            let listItem = document.createElement('li');
            listItem.appendChild(
                document.createElement('strong')
            ).textContent = user.name + ": " + user.email;
            list.appendChild(listItem);
          }
        });
  }*/

  componentWillMount() {
    //this.callAPI();
  }

  render() {
    return (
        <div className="App">
          <Header />
        </div>
    );
  }

}

export default App;
