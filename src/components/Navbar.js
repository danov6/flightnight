import React from 'react';

export default class Navbar extends React.Component {
    render(){
      return (
        <header className="masthead mb-auto">
          <div className="inner">
            <nav className="nav nav-masthead justify-content-center">
              <a className="nav-link active" href="#">Home</a>
              <a className="nav-link" href="#">Donate</a>
              <a className="nav-link" href="#">Contact</a>
            </nav>
          </div>
        </header>
      );
    }
}