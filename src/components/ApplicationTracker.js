import React from 'react';
import AddApplicationModal from "./AddApplicationModal";
import Application from "./Application";
import firebase from "firebase/app";
import 'firebase/firestore';
export default class ApplicationTracker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addApplication: false,
            applications: [],
        }
        this.update = this.update.bind(this);
    }

    async componentDidMount() {
        await this.callAPI();
    }

    async callAPI() {
        await firebase.firestore().collection("applications")
            .where('username', '==', this.props.username)
            .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({
                    applications: [...this.state.applications, <Application applicationInformation={doc.data()} username={this.props.username} update={this.update} />],
                });
            });
        });
    }

    async update() {
        this.setState({applications: []});
        await this.callAPI()
    }

    render() {
        return (
            <div className='applicationTracker'>
                <AddApplicationModal username={this.props.username} update={this.update}/>
                <h2>{this.props.username}'s Applications:</h2>
                {this.state.applications}
            </div>
        )
    }
}