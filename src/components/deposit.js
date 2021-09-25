import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { depositAmount } from '../actions/';
import Transaction from './transaction';
import { CURRENCY_NOTES } from '../constants';

const Deposit = (props) => {
    const [formErrors, setformErrors] = useState(false);
    const qty = useRef(null);
    const curdomination = useRef(null);
    const addCurrency = () => {
        const quantity = qty.current.value;
        const currency = curdomination.current.value;
        if (quantity && currency !== 'Select') {
            setformErrors(false)
            props.deposit(currency, quantity)
        }
        else setformErrors(true)
    }

    return (
        <React.Fragment>
            <div className="col">
                <label htmlFor="form-select-curr-domination" className="float-start fs-6 ">Denomination Currency</label>
                <select className="form-select" aria-label="form-select-curr-domination" ref={curdomination}>
                    <option defaultValue={'Select'} >Select</option>
                    {
                        CURRENCY_NOTES.map(val => { return (<option key={val} value={val}>Rs. {val}</option>) })
                    }
                </select>
                {formErrors ? <span className="err-txt text-danger fw-bold">*Please Enter All the Fields</span> : ""}
            </div>
            <div className="col">
                <label htmlFor="Quantity" className="float-start fs-6">Quantity</label>
                <input type="number" className="form-control" placeholder="Quantity" aria-label="Quantity" ref={qty} />

            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-primary mt-4 float-start" onClick={(e) => addCurrency()}>ADD</button>
            </div>
            <Transaction data={props.transactions} label={'deposit'} />
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