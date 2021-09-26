import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import Transaction from './transaction';
import { AMOUNT_ERR_MSG,INSUFFICIENT_BALANCE_ERR,CURRENCY_NOTES_NOT_AVAILABLE_ERR } from '../constants';

const Withdraw = (props) => {
    const [result, setResult] = useState([]);
    const [formErrors, setformErrors] = useState(false);
    const amountRef = useRef(null);
    const checkBalance = (amount) => {
        const balance = props.transactions.reduce((acc,cur)=> {
            acc += Number(cur.currency) * Number(cur.quantity);
            return acc;
        },0)

        if(balance < amount) {
            alert(INSUFFICIENT_BALANCE_ERR);
            return false;
        }
        else {
            const availableCurr = props.transactions.filter(val => val.currency <= Number(amount)).reduce((acc,cur)=> {
                acc += Number(cur.currency) * Number(cur.quantity);
                return acc;
            },0)

            if(amount > availableCurr) {
                alert(CURRENCY_NOTES_NOT_AVAILABLE_ERR);
                return false;
            }
            else {
                return true;
            }
        }
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
        if (Number.isInteger(Number(amount)) && amount ) {
            const chlAccountBalanceAndDenomination = checkBalance(amount);
            if(chlAccountBalanceAndDenomination) {
                calculateDenomination(amount)
            }
        }
        else setformErrors(true)

    }

    return (
        <React.Fragment>
            <div className="col-10 d-flex">
                <label htmlFor="Amount" className="fs-6 w-50 pt-1">Withdraw Amount</label>
                <input type="number" className="form-control" placeholder="Amount" ref={amountRef} aria-label="Amount" />
                <button type="button" className="btn btn-color mt-1 ms-3 float-start rounded" onClick={(e) => withdrawCurrency()}>WITHDRAW</button>
            </div>
            {formErrors ? <span className="err-txt text-danger fw-bold">{AMOUNT_ERR_MSG}</span> : ""}
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