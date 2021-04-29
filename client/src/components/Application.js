import React from 'react';
import {Button} from "reactstrap";

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.applicationInformation;
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
                    <Button color='primary'>{this.state.status}</Button>
                </div>
                <Button color='danger' size='sm' className='deleteApplication'>X</Button>
            </div>
        )
    }
}