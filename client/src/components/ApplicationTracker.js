import React from 'react';

export default class ApplicationTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addApplication: false
        }
    }

    showComponent(name) {
        switch (name) {
            case "addApplication":
                this.setState({addApplication: true});
                break;
            default:
                this.setState(this.state);
        }
    }

    hideComponent(name) {
        switch (name) {
            case "addApplication":
                this.setState({addApplication: false});
                break;
            default:
                this.setState(this.state);
        }
    }

    render() {
        const {addApplication} = this.state;
        return (
            <div>
                <h1>Application Tracker</h1>
                <button onClick={() => this.showComponent('addApplication')}>Add Application</button>
                {addApplication && (
                    <form>
                        <title>Application</title>
                        <label for='company'>Company:</label>
                        <input type='text' id='company' name='company' />
                        <label for='title'>Job Title</label>
                        <input type='text' id='title' name='title' />
                        <button onClick={() => {
                            this.hideComponent('addApplication')
                        }}>Submit</button>
                    </form>
                )}
                <h2>Applications:</h2>

            </div>
        )
    }
}