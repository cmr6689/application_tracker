import React from 'react';
import {Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default class AddApplicationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            company: '',
            jobTitle: '',
            notes: '',
            status: 'In Review'
        }
    }

    toggle() {
        this.setState({modal: !this.state.modal});
    }

    addApplication() {
        const putBody = {
            username: this.props.username,
            jobTitle: this.state.jobTitle,
            company: this.state.company,
            notes: this.state.notes,
            status: this.state.status
        }
        console.log(JSON.stringify(putBody));
        fetch("http://localhost:9000/api/addApplication", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putBody)
        })
            .then(req => req.json());
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let input = event.target.value;
        switch(name) {
            case 'company':
                this.setState({company: input});
                break;
            case 'jobTitle':
                this.setState({jobTitle: input});
                break;
            case 'notes':
                this.setState({notes: input});
                break;
            case 'status':
                this.setState({status: input});
                break;
            default:
                this.setState(this.state);
        }
    }

    validateForm() {
        //Check for blank fields
        if (this.state.company === '' || this.state.jobTitle === '') {
            alert("Please fill in all fields!");
        } else {
            this.toggle();
            this.addApplication();
            this.props.addApplication(this.state);
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
                                <Label for='jobTitle'>Job Title</Label>
                                <Input type='name' name='jobTitle' id='jobTitle' onChange={this.onChangeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='companyName'>Company</Label>
                                <Input type='name' name='company' id='companyName' onChange={this.onChangeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='notes'>Notes</Label>
                                <Input type='textarea' name='notes' id='notes' onChange={this.onChangeHandler}/>
                                <FormText>Pay, duties, location, recruiter information, etc.</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for='status'>Status</Label>
                                <Input type='select' name='status' id='status' onChange={this.onChangeHandler}>
                                    <option>In Review</option>
                                    <option>Interview</option>
                                    <option>Offered</option>
                                    <option>Rejected</option>
                                    <option>Withdrawn</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => {this.validateForm()}}>Add Application</Button>{' '}
                        <Button color="danger" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}