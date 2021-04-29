import React from 'react';
import {Button} from "reactstrap";

export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.applicationInformation;
    }

    getStatusButton(status) {
        switch(status) {
            case 'In Review':
                return (
                    <Button color='secondary'>{status}</Button>
                )
            case 'Interview':
                return (
                    <Button color='info'>{status}</Button>
                )
            case 'Offered':
                return (
                    <Button color='success'>{status}</Button>
                )
            case 'Rejected':
                return (
                    <Button color='danger'>{status}</Button>
                )
            case 'Withdrawn':
                return (
                    <Button color='warning'>{status}</Button>
                )
            default:
                return (
                    <Button color='primary'>ERROR</Button>
                )
        }
    }

    render() {
        return (
            <div className='application'>
                <div style={{textAlign: 'left'}}>
                    <h4>{this.state.jobTitle}</h4>
                    <h5 className='text-muted'>{this.state.company}</h5>
                </div>
                <div style={{textAlign: 'left'}}>
                    <span style={{textAlign: 'left'}}>{this.state.notes}</span>
                    <br /><br />
                    {this.getStatusButton(this.state.status)}
                </div>
                <Button color='danger' size='sm' className='deleteApplication'>X</Button>
            </div>
        )
    }
}