import React from 'react';
import {Button, Modal, ModalFooter, ModalHeader} from "reactstrap";

export default class RemoveApplicationModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle() {
        this.setState({modal: !this.state.modal});
    }

    render() {
        return (
            <div>
                <Button color='danger' size='sm' className='deleteApplication' onClick={() => {this.toggle()}}>X</Button>
                <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
                    <ModalHeader toggle={() => this.toggle()}>Confirm Application Removal</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onClick={() => {
                            this.toggle();
                            this.props.deleteApplication();
                        }}>Delete</Button>{' '}
                        <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}