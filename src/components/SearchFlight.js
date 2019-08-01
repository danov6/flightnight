import React from 'react';

export default class SearchFlight extends React.Component {
  state = {
    airport: 'LAX',
    startDate: '',
    endDate: '',
  };
  render(){
    return (
      <main role="main" className="inner cover">
        <h1 className="cover-heading"><img src="../images/quicktripz_logo.png" /></h1>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search destination" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" style={{backgroundColor: '#007bff', color: '#fff'}}><span className="glyphicon glyphicon-map-marker"></span></button>
          </div>
        </div>
        <p className="lead" style={{margin: 30}}>
        Leave On: 
          <select>
            <option value="" disabled selected>Select One</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
           Return Sunday.
        </p>
        <p className="lead" style={{margin: 30}}>
          <a href="#" className="btn btn-lg btn-primary">Search Airports</a>
        </p>
      </main>
    );
  }
  getCurrentLocation = () => {

  }
  getReturnDate = () => {
    var date = new Date();
    var day = date.getDay();
    var daysTilSunday = 7 - day;

    //If already Thursday or Friday, plan for next week
    if(daysTilSunday <= 3){
      daysTilSunday += 7;
    }
    date.setDate(date.getDate() + daysTilSunday);
    return date;
  }
}
