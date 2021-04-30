import React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
    ModalHeader,
} from 'reactstrap';
import firebase from "firebase/app";
import 'firebase/firestore';

export default class LoginModal extends React.Component {
    usernames = [];
    passwords = [];

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            username: '',
            password: '',
            initial: true
        }
    }

    toggle() {
        this.setState({modal: !this.state.modal});
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let input = event.target.value;
        if (name === 'username') {
            this.setState({username: input});
        } else if (name === 'password') {
            this.setState({password: input});
        }
    }

    validateForm() {
        if (this.state.password === '' || this.state.username === '') {
            alert("Please fill in all fields!");
            return;
        }
        firebase.firestore().collection('users').doc(this.state.username)
            .get().then((doc) => {
                if (doc.exists && doc.data().password === this.state.password) {
                    this.toggle();
                    this.props.sendUsername(this.state.username);
                    this.props.showComponent('signedIn');
                } else {
                    alert('Username or password is incorrect');
                }
            });
    }

    render() {
        const {modal} = this.state;
        return (
            <div>
                <Button color="secondary" size='lg' onClick={() => this.toggle()}>Login</Button>
                <Modal isOpen={modal} toggle={() => this.toggle()} className='loginModal'>
                    <ModalHeader>Sign In</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for='loginUsername'>Username</Label>
                                <Input type='name' name='username' id='loginUsername' onChange={this.onChangeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='loginPassword'>Password</Label>
                                <Input type='password' name='password' id='loginPassword' onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => {this.validateForm()}}>Login</Button>{' '}
                        <Button color="danger" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}