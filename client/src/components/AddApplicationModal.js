import React from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default class AddApplicationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        }
    }

    toggle() {
        this.setState({modal: !this.state.modal});
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let input = event.target.value;
        if (name === 'company') {
            this.setState({username: input});
        } else if (name === 'jobTitle') {
            this.setState({password: input});
        }
    }

    render() {
        const {modal} = this.state;
        return (
            <div>
                <Button color="primary" size='lg' onClick={() => this.toggle()}>Add Application</Button>
                <Modal isOpen={modal} toggle={() => this.toggle()} className='addApplicationModal'>
                    <ModalHeader>Sign In</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for='companyName'>Company</Label>
                                <Input type='name' name='company' id='companyName' onChange={this.onChangeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='jobTitle'>Job Title</Label>
                                <Input type='name' name='jobTitle' id='jobTitle' onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => {this.toggle()}}>Add Application</Button>{' '}
                        <Button color="danger" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}