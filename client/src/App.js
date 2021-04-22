import React from 'react';
import './App.css';
import ApplicationTracker from "./components/ApplicationTracker";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/api/users")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
        <div className="App">
          <ApplicationTracker />
          <p>{this.state.apiResponse}</p>
        </div>
    );
  }

}

export default App;
