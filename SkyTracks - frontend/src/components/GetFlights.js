import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import FlightDetails from './flightDetails';

const url = 'https://powerful-tundra-37375.herokuapp.com/getFlights/'
// const url = "http://localhost:1050/getFlights/"; //for localhost

export default class GetFlights extends Component {
    constructor(props){
        super(props);
        this.state = {
            availableFlights:null,
            form:{
                origin: "",
                destination: "",
                departureDate: "",
                noOfTickets: 0
            },
            formErrorMessage:{
                originError: "",
                destinationError: "",
                departureDateError: "",
                noOfTicketsError: ""
            },
            formValid:{
                originfield: false,
                destinationfield: false,
                departureDatefield: false,
                noOfTicketsfield: false,
                buttonActive:false
            },
            errorMessage:"",
        }
    }
    submitBooking = () => {

        axios.get(url+this.state.form.origin+"/"+this.state.form.destination).then((response)=>
        {

            this.setState({availableFlights:response.data})
        }).catch((error)=>
        {

            if(error.response)
            this.setState({errorMessage:error.response.data.message,availableFlights:null})
        })
    };
    handleSubmit = event => {

        event.preventDefault();
        this.submitBooking()
    };
    handleChange = event => {

       let {name,value}=event.target
       let form=this.state.form
      
       form[name]=value
       this.setState({form:form})
       this.validateField(name,value)
       
    };
    validateField = (fieldName, value) => {

       let err=""
       let errorMessage=this.state.formErrorMessage
       let valid=this.state.formValid
        if(fieldName==="origin")
        {
            if(value.length==0)
            {
              err="field required"
            }
            else if(value.length<=15)
            {
              if(!(value.match(/^[A-Za-z]{1,15}/)))
               {
               err="Please enter a valid origin city"
               }
           }
           else
           {
                err="Please enter a valid origin city"
           }
            errorMessage.originError=err
            valid.originfield=err?false:true
            this.setState({formErrorMessage:errorMessage})
        }
       else if(fieldName==="destination")
        {
            if(value.length==0)
            {
              err="field required"
            }
            else if(value.length<=15)
            {
              if(!(value.match(/^[A-Za-z]{1,15}/)))
               {
               err="Please enter a valid destination city"
               }
           }
           else
           {
                err="Please enter a valid destination city"
           }
           errorMessage.destinationError=err
           valid.destinationfield=err?false:true
           this.setState({formErrorMessage:errorMessage})
        }
       else if(fieldName==="departureDate")
        {
            if(value.length==0)
            {
              err="field required"
            }
        
            let date1=new Date() //take the present date
            let date2=new Date(this.state.form.departureDate) //gets the date from the from input

            
            if(!((date1.getDate()==date2.getDate())&& (date1.getFullYear()==date2.getFullYear()) && (date1.getMonth()==date2.getMonth())))
            {
                
                if(!(date2>=date1))
              err="Departure Date cannot be before day"
            }
            errorMessage.departureDateError=err
            valid.departureDatefield=err?false:true
            this.setState({formErrorMessage:errorMessage})
         }
       else if(fieldName==="noOfTickets")
        {
            if(value.length==0)
            {
              err="field required"
            }
            else if(value<1 || value>4)
            {
              if(value<1)
              err="Value should not be less than 1"
              else
              err="You cannot book 5 tickets at a time"   
            }
            errorMessage.noOfTicketsError=err
            valid.noOfTicketsfield=err?false:true
            this.setState({formErrorMessage:errorMessage})
            
        }
        valid.buttonActive=valid.originfield&&valid.destinationfield&&valid.departureDatefield&&valid.noOfTicketsfield
        
        this.setState({formValid:valid})
        
    };
    render(){
        if(this.state.availableFlights!=null){

            return( 
            <div>
                <FlightDetails flightData={this.state.availableFlights} form={this.state.form}/>
                <br></br><br></br><br></br>
            </div>
            )
    
        } else{
            return(
                <React.Fragment>
                   
                    <div className="container">
        
                        <div className="row mt-5">
                            <div className="col-lg-4 offset-lg-1">
                                <div className="card bg-card text-light ">
                                    <div className="card-body">

                                        <form>
                                            <div className="form-group">
                                                <label>Origin</label>
                                                <input type="text" className="form-control" placeholder="Origin" name="origin" value={this.state.form.origin} onChange={this.handleChange}/>
                                                <span name="originError" style={{color:"red"}}>{this.state.formErrorMessage.originError}</span>
                                            </div>
                                            <div className="form-group">
                                                <label>Destination</label>
                                                <input type="text" className="form-control" placeholder="Destination" name="destination" value={this.state.form.destination} onChange={this.handleChange}/>
                                                <span name="destinationError" style={{color:"red"}}>{this.state.formErrorMessage.destinationError}</span>
                                             </div>                                     
                                            <div className="form-group">
                                                <label>Departure Date</label>
                                                <input type="date" className="form-control"  name="departureDate" value={this.state.form.departureDate} onChange={this.handleChange}/>
                                                <span name="departureDateError" style={{color:"red"}}>{this.state.formErrorMessage.departureDateError}</span>
                                            </div>
                                            <div className="form-group">
                                                <label>No Of Tickets</label>
                                                <input type="number" className="form-control" placeholder="No OF Tickets" name="noOfTickets" value={this.state.form.noOfTickets} onChange={this.handleChange}/>
                                                <span name="noOfTicketsError" style={{color:"red"}}>{this.state.formErrorMessage.noOfTicketsError}</span>
                                            </div>
                                            <div className="form-group">   
                                                <button type="button" className="btn btn-primary" name="viewFlightsButton" onClick={this.handleSubmit} disabled={!(this.state.formValid.buttonActive)}>View Flights</button>
                                            </div>
                                        </form>
                                    </div>
                                    <span className="text-danger1">{this.state.errorMessage}</span>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

}