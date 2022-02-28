import React, { Component } from "react";
import axios from "axios";
import GetFlights from './GetFlights';
import BookingDetailsCard from './BookingDetailsCard';
import BookingDetails from "./Bookdetails"
const url = 'https://powerful-tundra-37375.herokuapp.com/bookFlight/'
// const url = "http://localhost:1050/bookFlight/"; //-- for localhost
class CreateBooking extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      bookingDetails:this.props.bookingDetails,
      passengerData:[],
      form: {
        firstName: "",
        lastName:"",
        title: "",
        age:""
      },
      formErrorMessage: {
        firstNameError: "",
        lastNameError:"",
        ageError:""
      },
      formValid: {
        firstName: false,
        lastName:false,
        age:false,
        buttonActive:false
      },
      errorMessage: "",
      successMessage: "",
      goBack: false,
      new:false
    };
    this.click = this.click.bind(this);
  }

  book = () => {
    let bookingData = this.state.bookingDetails;
    bookingData.passengerDetails = this.state.passengerData;

    axios.post(url,bookingData).then((response)=>{

     this.setState({successMessage:response.data})
     
    
    }).catch((error)=>
    {
      if(error.response)
      {
        this.setState({errorMessage:error.response.data.message})
      }
    })
  };

  handleChange = event => {
  
    let form=this.state.form
    let {name,value}=event.target
    form[name]=value

    this.setState({form:form})

    this.validateField(name,value)

  };

  validateField = (fieldName, value) => {

    let err=""
    let formerr=this.state.formErrorMessage
    let valid=this.state.formValid
    if(fieldName==="firstName")
    {
       if(value.length<0)
       err="field required"
       else if(!value.match(/^[A-Za-z]{1,15}$/))
       err="please enter a valid first name"
       formerr.firstNameError=err
       valid.firstName=err?false:true
       this.setState({formErrorMessage:formerr})
      
    }
    else if(fieldName==="lastName")
    {
      if(value.length<0)
      err="field required"
      else if(value.length<=15)
      {
        if(!value.match(/^[A-Za-z]{1,15}$/))
         err="please enter a valid last name"
      }
      else 
      err="please enter a valid last name"
      formerr.lastNameError=err
      valid.lastName=err?false:true
      this.setState({formErrorMessage:formerr})
    }
    else if(fieldName==="age")
    {
      if(value.length<0)
       err="field required"
       else if(value<1 ||value>70)
       err="Soory, age should be more than 1 year and less than 70 years"
       formerr.ageError=err
       valid.age=err?false:true
       this.setState({formErrorMessage:formerr})
    }
    valid.buttonActive=valid.firstName&&valid.lastName&&valid.age
    this.setState({formValid:valid})
  };
 
  setPassengerData = ()=>{
    
    let passengers={}
    passengers.firstName=this.state.form.firstName
    passengers.lastName=this.state.form.lastName
    passengers.age=this.state.form.age
    passengers.title=this.state.form.title
    this.state.passengerData.push(passengers)
    
    document.getElementById("updatetitle").value="Title"

    if(this.state.bookingDetails.noOfTickets==this.state.passengerData.length)
    {this.setState({new:true})}

    this.setState({successMessage:"",form:{
      firstName: "",
      lastName:"",
      title: "",
      age:""
    }})

  }
  componentWillMount(props){

    this.setState({bookingDetails:this.props.location.state.new})
  }
  getPassengerData = ()=>{
    if(this.state.passengerData.length<Number(this.state.bookingDetails.noOfTickets)){
      return(
        <React.Fragment>
          <div className="card bg-card text-light mb-4">
          <div className="card-body">
            <h6>Passenger {this.state.passengerData.length+1}</h6>
              <div className="row">

                <div className="col-md-8">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <select className="btn btn-light" name="title" onChange={this.handleChange} id="updatetitle" >
                        <option value="Title" >Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms." >Ms.</option>
                        <option value="Mrs." >Mrs.</option>
                      </select>
                    </div>
                    <input type="text" className="form-control" name="firstName" onChange={this.handleChange} value={this.state.form.firstName}/>
                    <input type="text" className="form-control" name="lastName" onChange={this.handleChange} value={this.state.form.lastName}/>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input type="number" className="form-control" name="age" onChange={this.handleChange} value={this.state.form.age}/>
                  </div>
                </div>
                <div className="col-md-2 text-center">
                  <button className="btn btn-primary font-weight-bolder"  disabled={!this.state.formValid.buttonActive} onClick={this.setPassengerData}>Add</button>
                </div>
              </div>
              <div className="text-danger">
                <span name="firstNameError">{this.state.formErrorMessage.firstNameError}</span><br/>
                <span name="lastNameError">{this.state.formErrorMessage.lastNameError}</span><br/>
                <span name="ageError"> {this.state.formErrorMessage.ageError}</span>
              </div>
          </div>
        </div>
        </React.Fragment>
      )
    }
  }
  displayBookingSuccess=()=>{
    return(
      <React.Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card bg-card custom-card text-light">
                <div className="card-body">

                  <h4 className="text-success">Booking successful with booking ID:{this.state.successMessage.bookingId} </h4>

                    <BookingDetails book={this.state.successMessage}/>
                </div>
                <div className="card-footer">

                  <button className="btn btn-warning" onClick={this.click}>home</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
click()
{
  this.setState({goBack:true})
}
  render() {
   
    if(this.state.goBack){

       return(<GetFlights/>)
    }
   else if(this.state.successMessage===""){
      return(
        <div className="container mt-5">
            <div className="row">
              <div className="col-lg-7">
                {
                  this.state.passengerData.length>0 ? (
                    this.state.passengerData.map((passenger,index)=>{
                      return(
                        <div className="card bg-card text-light mb-4" key={index}>
                          <div className="card-body">
                            <div className="text-custom">Passenger {index+1}</div>
                            <h4>{passenger.title} {passenger.firstName} {passenger.lastName}, {passenger.age}</h4>
                          </div>
                        </div>
                      )
                    })
                  ): null
                }
                {this.getPassengerData()}
                  
              </div>
              <div className="col-lg-4 offset-lg-1">
                <div name="flightDetails" className="card bg-card text-light">
                  <div className="card-body">
 
                    <BookingDetailsCard bookingDetails={this.state.bookingDetails} />
                  </div>
                  <div className="card-footer">
                        <button name="bookButton" className="btn btn-primary" disabled={!this.state.new} onClick={this.book}>Book</button>
                        <button name="goBack" className="btn btn-warning" onClick={this.click}>Home</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    } else{
        return this.displayBookingSuccess();
    }
  }
}

export default CreateBooking;
