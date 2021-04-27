import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Input, Label, ModalHeader} from 'reactstrap';

export default class LoginModal extends React.Component {

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
                <Button color="secondary" size='lg' onClick={() => this.toggle()}>Login</Button>
                <Modal isOpen={modal} toggle={() => this.toggle()} className='loginModal'>
                    <ModalHeader>Sign In</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for='loginUsername'>Username</Label>
                                <Input type='name' name='name' id='loginUsername' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='loginPassword'>Password</Label>
                                <Input type='password' name='password' id='loginPassword' />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => {
                            this.toggle();
                            this.props.showComponent('signedIn');
                        }}>Login</Button>{' '}
                        <Button color="danger" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}