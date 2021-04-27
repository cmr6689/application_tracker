import React from 'react';
import {Button} from "reactstrap";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false
        }
    }

    showComponent(name) {
        switch(name) {
            case 'signedIn':
                this.setState({signedIn: true});
                break;
            default:
                this.setState(this.state);
        }
    }

    hideComponent(name) {
        switch(name) {
            case 'signedIn':
                this.setState({signedIn: false});
                break;
            default:
                this.setState(this.state);
        }
    }

    render() {
        return (
            <div>
                {!this.state.signedIn && (
                    <div className='header'>
                        <h1>Application Tracker</h1>
                    </div>
                )}
                {this.state.signedIn && (
                    <div className='header'>
                        <h1>Application Tracker</h1>
                        <Button color='secondary'>Logout</Button>
                    </div>
                )}
            </div>
        )
    }
}