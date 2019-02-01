import React from "react";
import {Route, Switch, Router} from "react-router-dom";
import Home from "./App";
import ChatRoom from "./Containers/chatroom";
import SecuredRoom from "./Containers/secured";

const Main = () => (
    <main className="container">
        <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route exact path={"/chatroom"} component={ChatRoom}/>
            <Route exact path={"/private"} component={SecuredRoom}/>
        </Switch>
    </main>
);

export default Main
