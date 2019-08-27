import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';

//var airports = require('airports')
import { withStyles } from '@material-ui/core/styles';

const GreenCheckbox = withStyles({
    root: {
      color: '#fff',
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

export default class AirportResult extends React.Component {

  state = {
      checked: [false,false,false,false,false,false,false,false,false,false],
  }
  toggleCheckbox = (item,index) => {

    //set cell as active
    let node = document.querySelectorAll('table.airport-result-table')[index];
    if(node !== null){
        if(node.className.indexOf('active') !== -1){
            node.classList.remove('active');
        } else {
            node.classList.add('active');
        }
    }

    this.props.handleSelectedAirports(item.code);

    const { checked } = this.state;
    checked[index] = !checked[index];

    //update state
    this.setState({
        checked,
    });
  }

  render(){
    let airportData = [];
    //let eligibleAirportData = [];
    let api_results = this.props.airportData >= 10 ? 10 : this.props.airportData.length;


    //only get 5 results from API call
    for(var i = 0; i < api_results; i++){
        airportData.push(this.props.airportData[i]);
    }

    //grab major airports only
    // for(var k = 0; k < airportData.length; k++){
    //     if(airports[j].iata === airportData[k].code){
    //         airportData.push(airportData[k]);
    //         break;
    //     }
    // }
    const airportsResults = airportData.map((item, index)=>{
        return <div style={{margin: '2%'}} key={index} >
                    <table style={{width: '100%'}} className='airport-result-table' onClick={() => this.toggleCheckbox(item, index)}>
                        <tbody>
                            <tr>
                                <td style={{width: '20%'}}>
                                <GreenCheckbox color="primary"
                                    checked={this.state.checked[index]}
                                    value={index}
                                     />
                                </td>
                                <td style={{width: '60%'}}>
                                    {item.name + " (" + item.code + ")"}
                                </td>
                                <td style={{width: '20%'}}>
                                    {item.city}
                                </td>
                            </tr>
                        </tbody>    
                    </table>
                </div> 
    }); 
    return (
       <div style={{height: 300, overflow: 'scroll'}}>
            {airportsResults}
       </div>
    );
  }
}
