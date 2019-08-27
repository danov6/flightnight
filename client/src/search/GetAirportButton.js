import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import axios from 'axios';

var geolocation = require('geolocation')

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    width: '100%'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  function handleButtonClick() {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      geolocation.getCurrentPosition(function (err, position) {
        if (err) throw err
        
        axios.get('https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius', {
        headers: {
            "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
            "x-rapidapi-key": "5f08b72835mshcd811738662246ep165193jsn0540c4a0f32d"
        },
        params: {
            "radius": 50,
            "lng": position.coords.longitude,
            "lat": position.coords.latitude
        },
        responseType: 'json'
        })
        .then(function (response) {
            console.log('Long: ' + position.coords.longitude);
            console.log('Lat: ' + position.coords.latitude)

            setSuccess(true);
            setLoading(false);
            props.setAirportResults(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    });
      
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          //onClick={props.getClosestAirport}
          onClick={handleButtonClick}
          size="large"
        >
          Get Closest Airport
        </Button>
        {loading && <CircularProgress size={50} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}