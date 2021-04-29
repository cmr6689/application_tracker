import React from 'react';
import AddApplicationModal from "./AddApplicationModal";
import {Button} from "reactstrap";

export default class ApplicationTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addApplication: false,
            company: '',
            jobTitle: '',
            notes: '',
            status: '',
        }
        this.getNewApplication = this.getNewApplication.bind(this);
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

    getNewApplication(state) {
        this.setState(state);
        this.showComponent('addApplication');
    }

    render() {
        return (
            <div className='applicationTracker'>
                <AddApplicationModal sendState={this.getNewApplication}/>
                <h2>{this.props.username}'s Applications:</h2>
                {this.state.addApplication && (
                    <div className='application'>
                        <div style={{textAlign: 'left'}}>
                            <h4>{this.state.jobTitle}</h4>
                            <h5 className='text-muted'>{this.state.company}</h5>
                        </div>
                        <div style={{textAlign: 'left'}}>
                            <span style={{textAlign: 'left'}}>{this.state.notes}</span>
                            <br /><br />
                            <Button color='primary'>{this.state.status}</Button>
                        </div>
                        <Button color='danger' size='sm' className='deleteApplication'>X</Button>
                    </div>
                )}
            </div>
        )
    }
}