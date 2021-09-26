import React from 'react';
import Header from './header';
import Deposit from './deposit';
import Withdraw from './withdraw';
import {Switch,Route} from "react-router-dom";

const Home = () => {
    return(
        <div className="container">
            <Header />
            <div className="row frm border rounded p-3">
                <Switch>
                    <Route path="/Deposit">
                        <Deposit />
                    </Route>
                    <Route path="/Withdraw">
                        <Withdraw />
                    </Route>
                    <Route path="/">
                        <Deposit />
                    </Route>
                </Switch>
            </div>
            
        </div>
    )
}

export default Home;