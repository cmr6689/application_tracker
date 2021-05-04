import React from 'react';
import {Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import firebase from "firebase";

export default class EditApplicationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            jobTitle: this.props.applicationInformation.jobTitle,
            company: this.props.applicationInformation.company,
            location: this.props.applicationInformation.location,
            notes: this.props.applicationInformation.notes,
            status: this.props.applicationInformation.status
        }
    }

    toggle() {
        this.setState({modal: !this.state.modal});
    }

    editApplication() {
        let username = this.props.username;
        const path = username.concat(this.props.applicationInformation.jobTitle, this.props.applicationInformation.company);
        const docRef = firebase.firestore().collection("applications").doc(path);
        return firebase.firestore().runTransaction((transaction) => {
            return transaction.get(docRef).then((doc) => {
                if (!doc.exists) {
                    throw new Error("Document does not exist!");
                } else {
                    transaction.update(docRef, {
                        jobTitle: this.state.jobTitle,
                        company: this.state.company,
                        location: this.state.location,
                        notes: this.state.notes,
                        status: this.state.status
                    });
                }
            });
        });
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
            case 'location':
                this.setState({location: input});
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

    async validateForm() {
        //Check for blank fields
        if (this.state.company === '' || this.state.jobTitle === '') {
            alert("Please fill in all fields!");
        } else {
            this.toggle();
            await this.editApplication();
            this.props.update();
        }
    }

    render() {
        return (
            <div>
                <Button color='info' size='sm' className='editApplication' onClick={() => {this.toggle()}}>Edit</Button>
                <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
                    <ModalHeader toggle={() => this.toggle()}>Edit Application</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for='jobTitle'>Job Title</Label>
                                <Input defaultValue={this.state.jobTitle} type='name' name='jobTitle' id='jobTitle' onChange={this.onChangeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='companyName'>Company</Label>
                                <Input defaultValue={this.state.company} type='name' name='company' id='companyName' onChange={this.onChangeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='location'>Location</Label>
                                <Input defaultValue={this.state.location} type='name' name='location' id='location' onChange={this.onChangeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='notes'>Notes</Label>
                                <Input defaultValue={this.state.notes} type='textarea' name='notes' id='notes' onChange={this.onChangeHandler}/>
                                <FormText>Pay, duties, location, recruiter information, etc.</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for='status'>Status</Label>
                                <Input defaultValue={this.state.status} type='select' name='status' id='status' onChange={this.onChangeHandler}>
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
                        <Button color="success" onClick={() => {this.validateForm()}}>Edit Application</Button>{' '}
                        <Button color="danger" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}