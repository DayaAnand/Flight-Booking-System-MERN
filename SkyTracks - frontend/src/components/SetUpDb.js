import React, { Component } from 'react'
import "../App.css";
import axios from 'axios';


class SetUpDb extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dbMessage: null
            
        }
    }
    setUpDb = () => {
        this.setState({ dbMessage: null })
        axios.get("https://powerful-tundra-37375.herokuapp.com/setupDb").then(response => {
            // axios.get("http://localhost:1050/setupDb").then(response => { //for localhost
            this.setState({ dbMessage: response.data })
        }).catch(error => error.response.data.message)
    }

   

    render() {
        return (
            <div>
                {this.state.dbMessage ? (
                    <div className="col-md-5 offset-3">
                        <div className="alert alert-info alert-dismissible" id="alert">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>{this.state.dbMessage}</strong>
                        </div>
                    </div>
                ) : null}

                <div className="adminActions">
                    <input type="checkbox" name="adminToggle" className="adminToggle" />
                    <a className="adminButton" href="#!"><img src="assets/test.png" alt="admin button comes here" height="60vw" width="60vw" /></a>
                    <div className="adminButtons">
                        <a title="Setup DB" href="#!" onClick={this.setUpDb}><img src="./assets/db.png" alt="setup button comes here" height="27px" width="30px" /></a>
                    </div>
                </div>
            </div>
        )
    }
}


export default SetUpDb;