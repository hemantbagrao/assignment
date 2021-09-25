import React,{useRef} from 'react';
import { connect } from 'react-redux';
import { depositAmount } from '../actions/';
import Transaction from './transaction';

const Deposit = (props) => {
    const qty = useRef(null);
    const curdomination = useRef(null);
    const addCurrency = () => {
        const quantity = qty.current.value;
        const currency = curdomination.current.value;
        props.deposit(currency, quantity);
    }

    const currencyNotes = [1,2,5,10,20,50,100,200,500,2000]

    return (
        <React.Fragment>
            <div className="col">
            <label htmlFor="form-select-curr-domination" className="float-start fs-6">Domination Currency</label>
            <select className="form-select" aria-label="form-select-curr-domination"  ref={curdomination}>
            <option defaultValue={'Select'} >Select</option>
                {
                    currencyNotes.map(val => { return (<option value={val}>Rs. {val}</option>)})
                }
            </select>
            </div>
            <div className="col">
            <label htmlFor="Quantity" className="float-start fs-6">Quantity</label>
                <input type="number" className="form-control" placeholder="Quantity" aria-label="Quantity" ref={qty}/>
            </div>
            <div className="col">
                <button type="button" className="btn btn-primary mt-4 float-start" onClick={(e) => addCurrency()}>ADD</button>
            </div>
            <Transaction data={props.transactions} label={'deposit'}/>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    console.log("state==", state);
	return {
		transactions: state.transactions
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deposit: (currency,quantity) => {
			dispatch(depositAmount(currency,quantity));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);