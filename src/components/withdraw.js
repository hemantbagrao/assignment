import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import Transaction from './transaction';

const Withdraw = (props) => {
    const [result, setResult] = useState([]);
    const [formErrors, setformErrors] = useState(false);
    const amountRef = useRef(null);

    const checkBalance = () => {
        const balance = props.transactions.reduce(function(acc,curr) {
            return acc += curr.currency * curr.quantity
        },0);
        return balance;
    }
    const calculateDenomination = (amount) => {
        console.log("transactions",props.transactions);
        const result = props.transactions.sort((a, b) => b.currency - a.currency).map(val => Number(val.currency));
        console.log("result1",result);
        const divideBy = [...new Set(result)];
        
        console.log("divideBy",divideBy);
        let resultArray = [];
        divideBy.map(c => {
            let obj = { [c]: Math.floor(amount / c) }
            resultArray.push(obj);
            amount = amount % c;
        });
        setResult(resultArray);
    }

    const withdrawCurrency = () => {
        const amount = amountRef.current.value;
        const accountBalance = checkBalance();
        console.log("accountBalance", accountBalance);
        if (amount) {
            if(accountBalance > amount) {
                calculateDenomination(amount)
            }
            else {
                alert("Low balance!!");
            }
        }
        else setformErrors(true)

    }

    return (
        <React.Fragment>
            <div className="col-10 d-flex">
                <label htmlFor="Amount" className="fs-6 w-50 pt-1">Withdraw Amount</label>
                <input type="number" className="form-control" placeholder="Amount" ref={amountRef} aria-label="Amount" />
                <button type="button" className="btn btn-primary mt-1 ms-3 float-start rounded" onClick={(e) => withdrawCurrency()}>WITHDRAW</button>
            </div>
            {formErrors ? <span className="err-txt text-danger fw-bold">*Please Enter Amount</span> : ""}
            <Transaction data={result} />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions
    };
};

export default connect(mapStateToProps, null)(Withdraw);