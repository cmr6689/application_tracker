import React from 'react';
import {Button} from "reactstrap";
import ApplicationTracker from "./ApplicationTracker";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import firebase from 'firebase';

const firebaseConfig = {
    //removed for privacy
};

if (window.location.hostname === 'localhost') {
    firebase.firestore().useEmulator('localhost', 5000);
} else {
    firebase.initializeApp(firebaseConfig);
}

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            username: ''
        }

        this.showComponent = this.showComponent.bind(this);
        this.getUsername = this.getUsername.bind(this);
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

    getUsername(name) {
        this.setState({username: name});
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
                                <LoginModal showComponent={this.showComponent} sendUsername={this.getUsername}/>
                            </div>
                            <div>
                                <RegisterModal showComponent={this.showComponent} sendUsername={this.getUsername}/>
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
                        <ApplicationTracker username={this.state.username}/>
                    </div>
                )}
            </div>
        )
    }
}