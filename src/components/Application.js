import React from 'react';
import StatusModal from "./StatusModal";
import RemoveApplicationModal from "./RemoveApplicationModal";
import firebase from "firebase/app";
import 'firebase/firestore';
export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ''
        }
        this.deleteApplication = this.deleteApplication.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    async call() {
        let username = this.props.applicationInformation.username;
        let docTitle = username.concat(this.props.applicationInformation.jobTitle, this.props.applicationInformation.company);
        await firebase.firestore().collection('applications').doc(docTitle).delete();
    }

    async deleteApplication() {
        await this.call();
        this.props.update();
    }

    updateStatus() {
        this.props.update();
    }

    render() {
        return (
            <div className='application'>
                <div className='left' style={{textAlign: 'left'}}>
                    <h4>{this.props.applicationInformation.jobTitle}</h4>
                    <h5 className='text-muted'>{this.props.applicationInformation.company}</h5>
                    <h6 className='text-muted'>{this.props.applicationInformation.location}</h6>
                </div>
                <div className='right' style={{textAlign: 'left'}}>
                    <span style={{textAlign: 'left'}}>{this.props.applicationInformation.notes}</span>
                    <br /><br />
                    <StatusModal applicationInformation={this.props.applicationInformation} updateStatus={this.updateStatus}/>
                </div>
                <RemoveApplicationModal deleteApplication={this.deleteApplication} />
            </div>
        )
    }
}