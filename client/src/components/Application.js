import React from 'react';
import StatusModal from "./StatusModal";
import RemoveApplicationModal from "./RemoveApplicationModal";

export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ''
        }
        this.deleteApplication = this.deleteApplication.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    call() {
        const putBody = {
            username: this.props.username,
            jobTitle: this.props.applicationInformation.jobTitle,
            company: this.props.applicationInformation.company
        }
        fetch("http://localhost:9000/api/removeApplication", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putBody)
        })
            .then(req => req.json());
    }

    deleteApplication() {
        this.call();
        this.props.update();
    }

    updateStatus() {
        this.props.update();
    }

    render() {
        return (
            <div className='application'>
                <div style={{textAlign: 'left'}}>
                    <h4>{this.props.applicationInformation.jobTitle}</h4>
                    <h5 className='text-muted'>{this.props.applicationInformation.company}</h5>
                </div>
                <div style={{textAlign: 'left'}}>
                    <span style={{textAlign: 'left'}}>{this.props.applicationInformation.notes}</span>
                    <br /><br />
                    <StatusModal applicationInformation={this.props.applicationInformation} updateStatus={this.updateStatus}/>
                </div>
                <RemoveApplicationModal deleteApplication={this.deleteApplication} />
            </div>
        )
    }
}