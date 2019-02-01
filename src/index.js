import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import Main from "./router.js"
//import registerServiceWorker from './registerServiceWorker';

//Custom Components
import Navigation from "./Components/nav/"

import firebase from 'firebase'
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDLPuCPQwCYMu8RpMeJi_EpX-C2OO9JHwc",
    authDomain: "chatroom-1b3bd.firebaseapp.com",
    databaseURL: "https://chatroom-1b3bd.firebaseio.com",
    storageBucket: "chatroom-1b3bd.appspot.com",
    messagingSenderId: "328720495229"
};
firebase.initializeApp(firebaseConfig);

// The Header creates links that can be used to navigate
// between routes.

const App = () => (
    <div className="">
        <Navigation />
        <Main/>
    </div>
);

ReactDOM.render((
    <BrowserRouter basename={'/'}>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));
