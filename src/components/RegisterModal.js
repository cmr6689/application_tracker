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
    FormFeedback, FormText
} from 'reactstrap';
import firebase from "firebase/app";
import 'firebase/firestore';
export default class RegisterModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            username: '',
            password: '',
            confirmPass: '',
            usernameTaken: false,
            passwordNotSecure: false,
            passwordsDifferent: false,
        }
    }

    async checkUsername() {
        await firebase.firestore().collection('users').doc(this.state.username)
            .get().then((doc) => {
                if (doc.exists) {
                    this.setState({usernameTaken: true});
                } else {
                    this.setState({usernameTaken: false});
                }
        })
    }

    async addUser() {
        await firebase.firestore().collection("users").doc(this.state.username).set({
            username: this.state.username,
            password: this.state.password
        })
    }

    toggle() {
        this.setState({modal: !this.state.modal});
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let input = event.target.value;
        if (name === "email") {
            this.setState({email: input});
        } else if (name === 'username') {
            this.setState({username: input});
        } else if (name === 'password') {
            this.setState({password: input});
        } else if (name === 'confirmPass') {
            this.setState({confirmPass: input});
        }
    }

    async validateForm() {
        this.setState({passwordNotSecure: false});
        this.setState({passwordsDifferent: false});
        //Check for blank fields
        if (this.state.username === '') {
            alert("Please fill in all fields!");
            return;
        }
        //Check if username available
        await this.checkUsername();
        //Check if password is long enough
        if (this.state.password.length < 8) {
            this.setState({passwordNotSecure: true});
        } else {
            this.setState({passwordNotSecure: false});
        }
        //Check matching passwords
        if (this.state.confirmPass !== this.state.password) {
            this.setState({passwordsDifferent: true});
        } else {
            this.setState({passwordsDifferent: false});
        }
        //All fields valid
        if (this.state.usernameTaken === false && this.state.passwordNotSecure === false && this.state.passwordsDifferent === false) {
            this.toggle();
            await this.addUser();
            this.props.sendUsername(this.state.username);
            this.props.showComponent("signedIn");
        }
    }

    render() {
        const {modal} = this.state;
        return (
            <div>
                <Button color="secondary" size='lg' onClick={() => this.toggle()}>Register</Button>
                <Modal isOpen={modal} toggle={() => this.toggle()} className='registerModal'>
                    <ModalHeader>Create an Account</ModalHeader>
                    <ModalBody>
                        <Form>
                            {!this.state.usernameTaken && (
                                <FormGroup>
                                    <Label for='registerUsername'>Username</Label>
                                    <Input type='name' name='username' id='registerUsername' onChange={this.onChangeHandler} />
                                </FormGroup>
                            )}
                            {this.state.usernameTaken && (
                                <FormGroup>
                                    <Label for='registerUsername'>Username</Label>
                                    <Input invalid type='name' name='username' id='registerUsername' defaultValue={this.state.username} onChange={this.onChangeHandler} />
                                    <FormFeedback invalid>Username taken</FormFeedback>
                                </FormGroup>
                            )}
                            {!this.state.passwordNotSecure && (
                                <FormGroup>
                                    <Label for='registerPassword'>Password</Label>
                                    <Input type='password' name='password' id='registerPassword' onChange={this.onChangeHandler} />
                                    <FormText>Passwords must be at least 8 characters.</FormText>
                                </FormGroup>
                            )}
                            {this.state.passwordNotSecure && (
                                <FormGroup>
                                    <Label for='registerPassword'>Password</Label>
                                    <Input invalid type='password' name='password' id='registerPassword' onChange={this.onChangeHandler} />
                                    <FormFeedback invalid>Passwords must be at least 8 characters.</FormFeedback>
                                </FormGroup>
                            )}
                            {!this.state.passwordsDifferent && (
                                <FormGroup>
                                    <Label for='registerPasswordConfirm'>Confirm Password</Label>
                                    <Input type='password' name='confirmPass' id='registerPasswordConfirm' onChange={this.onChangeHandler} />
                                </FormGroup>
                            )}
                            {this.state.passwordsDifferent && (
                                <FormGroup>
                                    <Label for='registerPasswordConfirm'>Confirm Password</Label>
                                    <Input invalid type='password' name='confirmPass' id='registerPasswordConfirm' onChange={this.onChangeHandler} />
                                    <FormFeedback>Passwords are not the same</FormFeedback>
                                </FormGroup>
                            )}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => {this.validateForm()}}>Create Account</Button>{' '}
                        <Button color="danger" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}