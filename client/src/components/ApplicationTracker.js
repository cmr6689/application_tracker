import React from 'react';
import AddApplicationModal from "./AddApplicationModal";

export default class ApplicationTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addApplication: false
        }
    }

    showComponent(name) {
        switch (name) {
            case "addApplication":
                this.setState({addApplication: true});
                break;
            default:
                this.setState(this.state);
        }
    }

    hideComponent(name) {
        switch (name) {
            case "addApplication":
                this.setState({addApplication: false});
                break;
            default:
                this.setState(this.state);
        }
    }

    render() {
        return (
            <div className='applicationTracker'>
                <AddApplicationModal />
                <h2>{this.props.username}'s Applications:</h2>
            </div>
        )
    }
}