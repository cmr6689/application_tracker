import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        alert('A company was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Company
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
            </form>
        );
    }
}

class Position extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        alert('A position was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Position
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
            </form>
        );
    }
}

class DateApplied extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        alert('A date was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Date Applied
                    <input type="date" value={this.state.value} onChange={this.handleChange}/>
                </label>
            </form>
        );
    }
}

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        alert('A date was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Status
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
            </form>
        );
    }
}

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        alert('A date was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Notes
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
            </form>
        );
    }
}

class Application extends React.Component {
    renderPosition() {
        return (
            <Position />
        );
    }

    renderCompany() {
        return (
            <Company />
        );
    }

    renderDateApplied() {
        return (
            <DateApplied />
        );
    }

    renderStatus() {
        return (
            <Status />
        );
    }

    renderNotes() {
        return (
            <Notes />
        );
    }

    handleSubmit(event) {
        alert("Position " + this.renderPosition().value)
        event.preventDefault();
    }

    render() {
        return (
            <div>
                {this.renderPosition()}
                {this.renderCompany()}
                {this.renderDateApplied()}
                {this.renderStatus()}
                {this.renderNotes()}
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Add Application" />
                </form>
            </div>

        );
    }

}

// ========================================

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
