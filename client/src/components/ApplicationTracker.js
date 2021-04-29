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
        this.addApplication = this.addApplication.bind(this);
    }

    callAPI() {
        fetch("http://localhost:9000/api/applications")
            .then(res => res.json())
            .then(data => {
                for (const app of data.data) {
                    if (app.username === this.props.username) {
                        this.setState({
                            applications: [...this.state.applications, <Application applicationInformation={app} />],
                        });
                    }
                }
            });
    }

    componentDidMount() {
        this.callAPI();
    }

    addApplication(state) {
        this.setState({
            applications: [...this.state.applications, <Application applicationInformation={state} />],
        });
    }

    render() {
        return (
            <div className='applicationTracker'>
                <AddApplicationModal addApplication={this.addApplication} />
                <h2>{this.props.username}'s Applications:</h2>
                {this.state.applications}
            </div>
        )
    }
}