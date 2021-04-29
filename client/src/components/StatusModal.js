import React from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";

export default class StatusModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    getStatusButton() {
        switch(this.props.status) {
            case 'In Review':
                return (
                    <Button color='secondary' onClick={this.toggle}>{this.props.status}</Button>
                )
            case 'Interview':
                return (
                    <Button color='info' onClick={this.toggle}>{this.props.status}</Button>
                )
            case 'Offered':
                return (
                    <Button color='success' onClick={this.toggle}>{this.props.status}</Button>
                )
            case 'Rejected':
                return (
                    <Button color='danger' onClick={this.toggle}>{this.props.status}</Button>
                )
            case 'Withdrawn':
                return (
                    <Button color='warning' onClick={this.toggle}>{this.props.status}</Button>
                )
            default:
                return (
                    <Button color='primary'>ERROR</Button>
                )
        }
    }

    render() {
        const {modal} = this.state;

        return (
            <div>
                {this.getStatusButton(this.props.status)}
                <Modal isOpen={modal} onClick={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update Application Status</ModalHeader>
                    <ModalBody>
                        <Button color="secondary" style={{margin: '0.5em'}} onClick={this.toggle}>In Review</Button>
                        <Button color="info" style={{margin: '0.5em'}} onClick={this.toggle}>Interview</Button>
                        <Button color="success" style={{margin: '0.5em'}} onClick={this.toggle}>Offered</Button>
                        <Button color="danger" style={{margin: '0.5em'}} onClick={this.toggle}>Rejected</Button>
                        <Button color="warning" style={{margin: '0.5em'}} onClick={this.toggle}>Withdrawn</Button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}