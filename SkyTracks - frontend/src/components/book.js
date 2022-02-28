import React,{Component} from "react";


class Book extends Component
{
    constructor(props) {
        super(props);
    }
    render()
    {
        
        return(<div>
            <div className="text-custom">Flight ID</div>
            <h4 className="ml-4">{this.props.book[0].flightId}</h4>
            <div className="text-custom">Timing</div>  
            <h4 className="ml-4">{this.props.book[0].timing}</h4>
            <div className="text-custom">Departure Date</div>
            <h4 className="ml-4">{this.props.book[0].departureDate}</h4>
            <div className="text-custom">Origin - Destination</div>
            <h4 className="ml-4">{this.props.book[0].origin} - {this.props.book[0].destination}</h4>
            
        
            <div className="text-custom">Total Fare</div>
            <h4 className="ml-4"> &#8377; {Number(this.props.book[0].charges)}</h4> 
        </div>)
    }
}
export default Book;