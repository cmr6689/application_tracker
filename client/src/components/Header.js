import React from 'react';
import {Button} from "reactstrap";
import ApplicationTracker from "./ApplicationTracker";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false
        }

        this.showComponent = this.showComponent.bind(this);
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
                    <div>
                        <div className='header'>
                            <h1>Application Tracker</h1>
                        </div>
                        <div className='landingPageInfo'>
                            <h2>Welcome to Application Tracker!</h2>
                        </div>
                        <div className='signedOutHome'>
                            <div>
                                <LoginModal showComponent={this.showComponent}/>
                            </div>
                            <div>
                                <RegisterModal showComponent={this.showComponent}/>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.signedIn && (
                    <div>
                        <div className='header'>
                            <h1>Application Tracker</h1>
                            <Button color='secondary' onClick={() => this.hideComponent('signedIn')}>Logout</Button>
                        </div>
                        <ApplicationTracker />
                    </div>
                )}
            </div>
        )
    }
}