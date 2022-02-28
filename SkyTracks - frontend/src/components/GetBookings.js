import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import Book from './book';

const url = 'https://powerful-tundra-37375.herokuapp.com/viewBookingDetails/'
// const url = "http://localhost:1050/viewBookingDetails/"; // for localhost

class GetBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: null,
      bookingId: "",
      errorMessage: "",
    };
  }

  fetchBooking = () => {
    axios.get(url+this.state.bookingId).then((response)=>{
            this.setState({bookingData:response.data,errorMessage:""})
    }).catch((error)=>{

      if(error.response)
      {
        this.setState({errorMessage:error.response.data.message})
      }

    })
  }

  handleSubmit=(event)=>{
    event.preventDefault();
    this.fetchBooking();
  }
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    this.setState({ bookingId:value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card bg-card custom-card text-light">
                <div className="card-body">
                  <h4>View Booking Details</h4>
                  <form >

                    <div className="form-group">
                    <input type="number" name="bookingId" placeholder="Booking ID" className="form-control" onChange={this.handleChange} value={this.state.bookingId}/>
                    </div>
                    <button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.handleSubmit}>View Details</button>
                  </form>
                  <p className="text-danger">{this.state.errorMessage}</p>
                  {
                   ( (this.state.bookingData!=null))?(
                      <div className="mt-3">
                             
                         {((this.state.bookingData[0].bookingId==this.state.bookingId)?(<Book book={this.state.bookingData}/>):null)}
                      </div>
                    ):null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </React.Fragment>
    );
  }
}

export default GetBooking;
