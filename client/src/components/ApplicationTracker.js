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

    addApplication(state) {
        this.setState({applications: [...this.state.applications, <Application applicationInformation={state} />]})
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