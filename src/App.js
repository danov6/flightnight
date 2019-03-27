import React, { Component } from 'react';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SearchFlight from './components/SearchFlight';


class App extends Component {
  state = {
    page: 'Search'
  }

  render() {
    let page = {};
    if(this.state.page === "Search"){
      page = (
        <SearchFlight />
      );
    }
    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
        <Navbar />
        { page }
        <Footer />
      </div>
    );
  }
}

export default App;
