import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { depositAmount } from '../actions/';
import Transaction from './transaction';
import { CURRENCY_NOTES,DEPOSIT_ERR_MSG } from '../constants';

const Deposit = (props) => {
    const [formErrors, setformErrors] = useState(false);
    const qty = useRef(null);
    const curdomination = useRef(null);
    const addCurrency = () => {
        const quantity = qty.current.value;
        const currency = curdomination.current.value;
        
        if (Number.isInteger(Number(quantity)) && quantity && currency !== 'Select') {
            setformErrors(false)
            props.deposit(currency, quantity)
        }
        else setformErrors(true)
    }
    if(props.transactions) {
        const res = props.transactions.reduce((acc,curr) => {
            acc[curr.currency] ? acc[curr.currency] = Number(acc[curr.currency]) + Number(curr.quantity) : acc[curr.currency] = Number(curr.quantity);
            return acc;
        },{})
        
        var tempresult = [];
        for (var prop in res) {
            tempresult.push({ currency: prop, quantity: String(res[prop]), 'text':'Deposit' });
        }
    }
    const result = tempresult.sort((a, b) => b.currency - a.currency)

    

    return (
        <React.Fragment>
            <div className="col">
                <label htmlFor="form-select-curr-domination" className="float-start fs-6 ">Denomination Currency</label>
                <select className="form-select" aria-label="form-select-curr-domination" ref={curdomination}>
                    <option defaultValue={'Select'} >Select</option>
                    {
                        CURRENCY_NOTES.map((val,key) => { return (<option key={key} value={val}>Rs. {val}</option>) })
                    }
                </select>
                {formErrors ? <span className="err-txt text-danger fw-bold">{DEPOSIT_ERR_MSG}</span> : ""}
            </div>
            <div className="col">
                <label htmlFor="Quantity" className="float-start fs-6">Quantity</label>
                <input type="number" className="form-control" placeholder="Quantity" aria-label="Quantity" ref={qty} />

            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-color mt-4 float-start" onClick={(e) => addCurrency()}>ADD</button>
            </div>
            <Transaction data={result} label={'deposit'} />
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        transactions: state.transactions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deposit: (currency, quantity) => {
            dispatch(depositAmount(currency, quantity));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);