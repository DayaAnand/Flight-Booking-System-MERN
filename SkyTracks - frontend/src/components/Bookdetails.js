import React,{Component} from "react";


class BookingDetails extends Component
{
    constructor(props) {
        super(props);
    }
    render()
    {

        return(<div>
            <div className="text-custom">Flight ID</div>
            <h4 className="ml-4">{this.props.book.flightId}</h4>
            <div className="text-custom">Timing</div>  
            <h4 className="ml-4">{this.props.book.timing}</h4>
            <div className="text-custom">Departure Date</div>
            <h4 className="ml-4">{this.props.book.departureDate}</h4>
            <div className="text-custom">Origin - Destination</div>
            <h4 className="ml-4">{this.props.book.origin} - {this.props.book.destination}</h4>
            
        
            <div className="text-custom">Total Fare</div>
            <h4 className="ml-4"> &#8377; {Number(this.props.book.charges)}</h4> 
        </div>)
    }
}
export default BookingDetails;