import React from 'react';

export default class SearchFlight extends React.Component {
    render(){
      return (
        <main role="main" className="inner cover">
          <h1 className="cover-heading" style={{margin: 30}}>Plan a trip this weekend!</h1>
          <div className="input-group flex-nowrap">
            <input type="text" className="form-control" placeholder="Find city" aria-label="Search" aria-describedby="addon-wrapping" />
          </div>
          <p className="lead" style={{margin: 30}}>
            <a href="#" className="btn btn-lg btn-primary">Search Airports</a>
          </p>
        </main>
      );
    }
}