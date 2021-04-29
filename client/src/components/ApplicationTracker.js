import React from 'react';
import AddApplicationModal from "./AddApplicationModal";
import Application from "./Application";

export default class ApplicationTracker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addApplication: false,
            applications: [],
        }
        this.update = this.update.bind(this);
    }

    callAPI() {
        fetch("http://localhost:9000/api/applications")
            .then(res => res.json())
            .then(data => {
                for (const app of data.data) {
                    if (app.username === this.props.username) {
                        this.setState({
                            applications: [...this.state.applications, <Application applicationInformation={app} username={this.props.username} update={this.update} />],
                        });
                    }
                }
            });
    }

    componentDidMount() {
        this.callAPI();
    }

    update() {
        this.setState({applications: []});
        setTimeout(() => this.callAPI(), 5000);
    }

    render() {
        return (
            <div className='applicationTracker'>
                <AddApplicationModal username={this.props.username} update={this.update}/>
                <h2>{this.props.username}'s Applications:</h2>
                {this.state.applications}
            </div>
        )
    }
}