import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Particles from 'react-particles-js';

ReactDOM.render(
    <React.Fragment>
        <Particles 
            style={{
                position: 'absolute',
                zIndex: -100,
                backgroundColor: '#333'
            }}
        />
        <App />
    </React.Fragment>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
