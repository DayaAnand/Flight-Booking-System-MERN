import React, { Component } from "react";
import "../App.css";
import GetFlights from './GetFlights';
import DisplayAvailableFlightsCard from "./DisplayAvailableFlightsCard"
export default class FlightDetails extends Component {
    constructor(props){
        super(props);
        this.flightArray=[]
        this.state = {
            flightData:this.props.flightData,
            availableFlights: this.props.flightData,
            bookingDetails:null,
            errorMessage:"",
            form:this.props.form
        
        }
        this.click = this.click.bind(this);
    }
   
    
book () {
   let   i=0;
   
   for(i=0;i<this.state.flightData[0].flightIds.length;i++)
   {
    
    const j={id:this.state.flightData[0].flightIds[i],time:this.state.flightData[0].flightTimings[i],price:this.state.flightData[0].prices[i]}
    this.flightArray.push(j)
   }

}
componentWillMount()
{
 this.book()

}
displayAvailableFlights()
{
 return(   this.flightArray.map(ele=><DisplayAvailableFlightsCard flightid={ele.id} price={ele.price} flighttime={ele.time} form={this.state.form}/>))
}
click()
{
    this.setState({availableFlights:null})
}
    render(){
    
        if(this.state.availableFlights==null){

            return(<GetFlights/>)
        }
        
        else{
            return(
                <React.Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="card custom-card bg-card text-light">
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-md-4">
                                        <h4>{this.state.form.departureDate}</h4>
                                        <div className="text-custom">Departure Date</div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData[0].origin} - {this.state.flightData[0].destination}</h4>
                                        <div className="text-custom">Origin - Destination</div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>{this.state.form.noOfTickets} Adult(s)</h4>
                                        <div className="text-custom">Passengers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="float-right">
                            <button className="btn btn-warning" name="goBack" onClick={this.click}>Go Back</button>
                        </div>
                        <h2>Available Flights:</h2>
                        
                        <div  className="container mt-5 ">  
                              
                            {this.displayAvailableFlights()}
                         </div>
                    </div>
                </div>
            </React.Fragment>
            )
        }
    }

}