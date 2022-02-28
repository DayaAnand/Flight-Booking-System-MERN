import React from "react";
import { Redirect } from 'react-router-dom';

class DisplayAvailableFlightsCard extends React.Component
{
constructor(props)
{
    super(props)
    
    this.bookingDetails={}
    this.state={
        details:null
    }
}
setBookingDetails = (flightId,flighttime,f2,cost) =>{
    
this.bookingDetails.origin=f2.origin
this.bookingDetails.destination=f2.destination
this.bookingDetails.departureDate=f2.departureDate
this.bookingDetails.noOfTickets=f2.noOfTickets
this.bookingDetails.flightId=flightId
this.bookingDetails.timing=flighttime
this.bookingDetails.charges=Number(cost) * Number(f2.noOfTickets)
    

    this.updateDetailsState()
}
updateDetailsState()
{

    this.setState({details:this.bookingDetails})
    
}
render()
{

if(this.state.details!=null)
{
return(<div>
    
    <Redirect
            to={{
            pathname: "/create",
            state: { new:this.state.details }
          }}
        />
</div>)

}
else
{

    return (<div className="row " style={{paddingBottom:"20px"}}>
    <div className="card custom-card bg-card text-light">
        
    <div className="card-body">
        <div className="row">
<div className="col-md-3">
  <h4>{this.props.flighttime}</h4>
  <div className="text-custom">Non Stop</div>
</div>
<div className="col-md-3">
<h4>{this.props.flightid}</h4>
<div className="text-custom">Flight ID</div>
</div>
<div className="col-md-3">
  <h4>{this.props.price}</h4>
  <div className="text-custom">Fare per seat</div>
</div>

<div className="col-md-3">

<h4>Total Fare:&#x20B9;{this.props.form.noOfTickets*this.props.price} </h4>

<button className="btn btn-primary"   name="addPassenger" onClick={(event) => {this.setBookingDetails(this.props.flightid,this.props.flighttime,this.props.form,this.props.price)}}>Add Passenger Details</button>
</div>
</div>
</div>
</div>
</div>)
}}
}
export default DisplayAvailableFlightsCard;