import React from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import firebase from "firebase/app";
import 'firebase/firestore';
export default class StatusModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            newStatus: ''
        }
        this.toggle = this.toggle.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    toggle() {
        this.setState({modal: !this.state.modal})
    }

    getStatusButton() {
        switch(this.props.applicationInformation.status) {
            case 'InReview':
                return (
                    <Button color='secondary' onClick={this.toggle}>In Review</Button>
                )
            case 'In Review':
                return (
                    <Button color='secondary' onClick={this.toggle}>{this.props.applicationInformation.status}</Button>
                )
            case 'Interview':
                return (
                    <Button color='info' onClick={this.toggle}>{this.props.applicationInformation.status}</Button>
                )
            case 'Offered':
                return (
                    <Button color='success' onClick={this.toggle}>{this.props.applicationInformation.status}</Button>
                )
            case 'Rejected':
                return (
                    <Button color='danger' onClick={this.toggle}>{this.props.applicationInformation.status}</Button>
                )
            case 'Withdrawn':
                return (
                    <Button color='warning' onClick={this.toggle}>{this.props.applicationInformation.status}</Button>
                )
            default:
                return (
                    <Button color='primary'>ERROR</Button>
                )
        }
    }

    async callAPI(name) {
        let username = this.props.applicationInformation.username;
        const path = username.concat(this.props.applicationInformation.jobTitle, this.props.applicationInformation.company);
        const docRef = firebase.firestore().collection("applications").doc(path);
        return firebase.firestore().runTransaction((transaction) => {
            return transaction.get(docRef).then((doc) => {
                if (!doc.exists) {
                    throw "Document does not exist!";
                } else {
                    transaction.update(docRef, {status: name});
                }
            });
        });
    }

    async updateStatus(name) {
        this.toggle();
        await this.callAPI(name);
        this.props.updateStatus();
    }

    render() {
        const {modal} = this.state;

        return (
            <div>
                {this.getStatusButton(this.props.status)}
                <Modal isOpen={modal} onClick={() => this.toggle()}>
                    <ModalHeader toggle={() => this.toggle()}>Update Application Status</ModalHeader>
                    <ModalBody>
                        <Button color="secondary" style={{margin: '0.5em'}} onClick={() => this.updateStatus('In Review')}>In Review</Button>
                        <Button color="info" style={{margin: '0.5em'}} onClick={() => this.updateStatus('Interview')}>Interview</Button>
                        <Button color="success" style={{margin: '0.5em'}} onClick={() => this.updateStatus('Offered')} id='Offered'>Offered</Button>
                        <Button color="danger" style={{margin: '0.5em'}} onClick={() => this.updateStatus('Rejected')}>Rejected</Button>
                        <Button color="warning" style={{margin: '0.5em'}} onClick={() => this.updateStatus('Withdrawn')}>Withdrawn</Button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}