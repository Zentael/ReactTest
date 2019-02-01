import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase';
import {withRouter} from 'react-router-dom';

import { Home } from "styled-icons/fa-solid/Home";
import { Chat } from "styled-icons/material/Chat";
import { LockOpen } from "styled-icons/boxicons-solid/LockOpen";

import StyledNavigation from "./style";


class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: false,
        };
        this.login = this.login.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                this.setState({
                    user: user
                });
            } else {
                // No user is signed in.
                this.setState({
                    user: false,
                });
            }
        });
    }

    login(){
        let googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        googleAuthProvider.addScope('https://www.googleapis.com/auth/plus.login');
        //firebase.auth().languageCode = 'fr'
        firebase.auth().signInWithPopup(googleAuthProvider);
    }

    logOut(){
        firebase.auth().signOut();
    }

    render() {
        const privateLink = () => {
            return this.state.user ? `/private` : this.props.location.pathname
        };
        return (
            <StyledNavigation className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item"><Link className="navbar-link" to={`/`}><Home/>Home</Link></li>
                    <li className="navbar-item"><Link className="navbar-link" to={`/chatroom`}><Chat/>ChatRoom</Link>
                    </li>
                    <li className="navbar-item"><Link className="navbar-link" to={privateLink()}><LockOpen/>Privé</Link>
                    </li>
                </ul>
                <ul className="navbar-list login">
                    <li className="navbar-item">
                        <button onClick={() => this.login()}>Login</button>
                    </li>
                    {
                        this.state.user &&
                        <li className="navbar-item">
                            <button onClick={() => this.logOut()}>Log Out</button>
                        </li>
                    }
                </ul>
            </StyledNavigation>
        );
    }
}

export default withRouter(Navigation);
