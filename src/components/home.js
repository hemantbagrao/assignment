import React,{useState} from 'react';
import Deposit from './deposit';
import Withdraw from './withdraw';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Home = () => {
    const [title, setTitle] = useState('DEPOSIT');

    return(
        <div className="container">
            <div className="row mb-4">
                <div className="col-6">
                <Link to="/Deposit">
                    <button type="button" className={title==='DEPOSIT' ? "btn btn-primary" : 'btn btn-outline-primary'} onClick={() => setTitle('DEPOSIT')}>DEPOSIT</button>
                </Link>
                </div>
                <div className="col-6">
                <Link to="/Withdraw">
                <button type="button" className={title==='WITHDRAW' ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setTitle('WITHDRAW')}>WITHDRAW</button>
                </Link>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <span className="title">{title}</span>
                </div>
            </div>

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