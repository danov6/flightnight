import React from 'react';
import GetAirportButton from './GetAirportButton';
import AirportResult from './AirportResult';

export default class SearchFlight extends React.Component {
  state = {
    selectedAirports: [],
    airportData: [],
    departDate: '',
    returnDate: ''
  };
  componentDidMount(){
    
    //set arrival date
    this.setState({
    returnDate: (this.getReturnDate().getFullYear() + "-" + (this.getReturnDate().getMonth().toString().length === 1 ? "0" + (this.getReturnDate().getMonth() + 1): this.getReturnDate().getMonth() + 1) + "-" + (this.getReturnDate().getDate().toString().length === 1 ? "0" + this.getReturnDate().getDate(): this.getReturnDate().getDate()) )
    });
  }
  render(){
    let day = 24 * 60 * 60 * 1000;
    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const date = new Date();
    const dow = date.getDay();

    days = days.slice(dow, days.length + 1);

    let future_days = [];

    for(var i = 0; i < days.length; i++){
        future_days.push(new Date(new Date().getTime() + day * (i + 1)))
    }

    const options = days.map((item, index)=>{
        return <option value={future_days[index].getFullYear() + "-" + (future_days[index].getMonth().toString().length === 1 ? "0" + (future_days[index].getMonth() + 1): future_days[index].getMonth() + 1) + "-" + (future_days[index].getDate().toString().length === 1 ? "0" + future_days[index].getDate(): future_days[index].getDate())} key={index}>{item}</option>
    });

    return (
      <main role="main" className="inner cover">
        <h1 className="cover-heading">{this.state.airportData.length > 0 ? "Select Airports": <img src="../images/quicktripz_logo.png" /> }</h1>
        <div className="input-group mb-3">
        <div className="lead" style={{margin: 30, width: '100%'}}>
            {this.state.airportData.length > 0 ?
                 <AirportResult 
                 airportData={ this.state.airportData }
                 handleSelectedAirports= { this.handleSelectedAirports } /> :
                  <GetAirportButton setAirportResults={ this.setAirportResults } /> }
        </div>
        </div>
        <p className="lead" style={{margin: 30}}>
        Leave On: 
          <select onChange={ this.setDepartureDate } >
            <option value="" disabled defaultValue>Select One</option>
            {options}
          </select>
        </p>
        <p className="lead" style={{margin: 30}}>
            Return Sunday {((this.getReturnDate().getMonth().toString().length === 1 ? "0" + (this.getReturnDate().getMonth() + 1): this.getReturnDate().getMonth() + 1) + "/" + (this.getReturnDate().getDate().toString().length === 1 ? "0" + this.getReturnDate().getDate(): this.getReturnDate().getDate()) + "/" + this.getReturnDate().getFullYear())}.
        </p>
      </main>
    );
  }
  setAirportResults = (airports) => {
    this.setState({
        airportData: airports
    });
  };
  getReturnDate = () => {
    var date = new Date();
    var day = date.getDay();
    var daysTilSunday = 7 - day;

    //If already Thursday or Friday, plan for next week
    // if(daysTilSunday <= 3){
    //   daysTilSunday += 7;
    // }
    date.setDate(date.getDate() + daysTilSunday);

    return date;
  };
  setDepartureDate = (e) => {
    const date = e.target.value;

    //set depart date
    this.setState({
        departDate: date
    });
  }
  handleSelectedAirports = (airport) => {
    let { selectedAirports } = this.state;

    //remove airport if found
    for(var i = 0; i < selectedAirports.length; i++){
        if(selectedAirports[i] === airport){
            selectedAirports.splice(i,1);
            this.setState({
                selectedAirports: selectedAirports
            });
            return;
        }
    }

    //add airport if not found
    this.setState(prevState => ({
        selectedAirports: [...prevState.selectedAirports, airport]
    }));
  }
}