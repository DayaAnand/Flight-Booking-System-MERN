import React,{Component} from "react";


class BookingDetailsCard extends Component
{
    constructor(props) {
        super(props);
    }
    render()
    {
        return(<div>
            <div className="text-custom">Flight ID</div>
            <h4 className="ml-4">{this.props.bookingDetails.flightId}</h4>
            <div className="text-custom">Timing</div>  
            <h4 className="ml-4">{this.props.bookingDetails.timing}</h4>
            <div className="text-custom">Departure Date</div>
            <h4 className="ml-4">{this.props.bookingDetails.departureDate}</h4>
            <div className="text-custom">Origin - Destination</div>
            <h4 className="ml-4">{this.props.bookingDetails.origin} - {this.props.bookingDetails.destination}</h4>
            <div className="text-custom">Passengers</div>
            <h4 className="ml-4">{this.props.bookingDetails.noOfTickets} Adult(s)</h4>
            <div className="text-custom">Total Fare</div>
            <h4 className="ml-4"> &#8377; {Number(this.props.bookingDetails.charges)}</h4> 
        </div>)
    }
}
export default BookingDetailsCard;