import React from 'react';
import {Button} from "reactstrap";
import StatusModal from "./StatusModal";

export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ''
        }
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
                    <StatusModal status={this.props.applicationInformation.status} updateStatus={this.updateStatus}/>
                </div>
                <Button color='danger' size='sm' className='deleteApplication'>X</Button>
            </div>
        )
    }
}