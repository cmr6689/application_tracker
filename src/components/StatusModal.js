import React from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";

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
        const putBody = {
            status: name,
            username: this.props.applicationInformation.username,
            jobTitle: this.props.applicationInformation.jobTitle,
            company: this.props.applicationInformation.company
        }
        await fetch("https://application-tracker-cmr6689.web.app/api/updateStatus", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putBody)
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