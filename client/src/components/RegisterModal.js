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

export default class RegisterModal extends React.Component {
    emails = [];
    usernames = [];

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: '',
            username: '',
            password: '',
            confirmPass: '',
            emailTaken: false,
            usernameTaken: false,
            passwordNotSecure: false,
            passwordsDifferent: false,
            blank: false
        }
    }

    callAPI() {
        fetch("http://localhost:9000/api/users")
            .then(res => res.json())
            .then(data => {
                for (const user of data.data) {
                    this.usernames.push(user.username);
                    this.emails.push(user.email);
                }
            });
        console.log(this.emails);
        console.log(this.usernames);
    }

    componentDidMount() {
        this.callAPI();
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

    validateForm() {
        let valid = 0;
        if (this.state.email === '' && this.state.username === '') {
            alert("Please fill in all fields!");
            return;
        }
        if (!this.state.email.includes('@') || !this.state.email.includes('.')) {
            alert("Please enter a valid email address.");
            return;
        }
        if (this.emails.includes(this.state.email)) {
            this.setState({emailTaken: true});
        } else {
            this.setState({emailTaken: false});
            valid++;
        }
        if (this.usernames.includes(this.state.username)) {
            this.setState({usernameTaken: true});
        } else {
            this.setState({usernameTaken: false});
            valid++;
        }
        if (this.state.password.length < 8) {
            this.setState({passwordNotSecure: true});
        } else {
            this.setState({passwordNotSecure: false});
            valid++;
        }
        if (this.state.confirmPass !== this.state.password) {
            this.setState({passwordsDifferent: true});
        } else {
            this.setState({passwordsDifferent: false});
            valid++;
        }
        if (valid === 4) {
            this.toggle();
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
                            {!this.state.emailTaken && (
                                <FormGroup>
                                    <Label for='registerEmail'>Email Address</Label>
                                    <Input type='email' name='email' id='registerEmail' onChange={this.onChangeHandler} />
                                </FormGroup>
                            )}
                            {this.state.emailTaken && (
                                <FormGroup>
                                    <Label for='registerEmail'>Email Address</Label>
                                    <Input invalid type='email' name='email' id='registerEmail' defaultValue={this.state.email} onChange={this.onChangeHandler} />
                                    <FormFeedback invalid>Email already registered, please login.</FormFeedback>
                                </FormGroup>
                            )}
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