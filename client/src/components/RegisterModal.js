import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Input, Label, ModalHeader} from 'reactstrap';

export default class RegisterModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }
    }

    toggle() {
        this.setState({modal: !this.state.modal});
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
                            <FormGroup>
                                <Label for='registerEmail'>Email Address</Label>
                                <Input type='email' name='email' id='registerEmail' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='registerUsername'>Username</Label>
                                <Input type='name' name='name' id='registerUsername' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='registerPassword'>Password</Label>
                                <Input type='password' name='password' id='registerPassword' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='registerPasswordConfirm'>Confirm Password</Label>
                                <Input type='password' name='password' id='registerPasswordConfirm' />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => {
                            this.toggle();
                            this.props.showComponent('signedIn');
                        }}>Create Account</Button>{' '}
                        <Button color="danger" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}