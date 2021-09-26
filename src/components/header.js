import React,{useState} from 'react';
import {Link} from "react-router-dom";
const Header = () => {
    const [title, setTitle] = useState('DEPOSIT');
    return(
    <React.Fragment>
        <div className="row mb-4">
            <div className="col-6">
                <Link to="/Deposit">
                    <button type="button" className={title === 'DEPOSIT' ? "btn btn-primary" : 'btn btn-outline-primary'} onClick={() => setTitle('DEPOSIT')}>DEPOSIT</button>
                </Link>
                <Link to="/Withdraw">
                    <button type="button" className={title === 'WITHDRAW' ? "btn btn-primary ms-5" : "btn btn-outline-primary ms-5"} onClick={() => setTitle('WITHDRAW')}>WITHDRAW</button>
                </Link>
            </div>

        </div>

        <div className="row mb-3">
            <div className="col-12">
                <span className="title">{title}</span>
            </div>
        </div>
    </React.Fragment>
    )
}

export default Header;