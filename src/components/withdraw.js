import React,{useState,useRef} from 'react';
import { connect } from 'react-redux';
import Transaction from './transaction';

const Withdraw = (props) => {
    const [result, setResult] = useState([]);
    const amountRef = useRef(null);

    const calculateDenomination = (amount) => {
        const result = props.transactions.map(val => Number(val.currency));
        const divideBy = [...new Set(result)];
        let resultArray = [];
        divideBy.map(c => {
            let obj = {[c]:Math.floor(amount / c)}
            resultArray.push(obj);
            amount = amount % c;
        });
        setResult(resultArray);
    }

    const withdrawCurrency = () => {
        const amount = amountRef.current.value;
        calculateDenomination(amount);
        
    }
    console.log("State",result);
    return (
        <React.Fragment>
            <div className="col-10 d-flex">
            <label htmlFor="Amount" className="fs-6">Withdraw Amount</label>
                <input type="number" className="form-control" placeholder="Amount" ref={amountRef} aria-label="Amount" />
                <button type="button" className="btn btn-primary mt-1 ms-3 float-start rounded" onClick={(e) => withdrawCurrency()}>WITHDRAW</button>
            </div>
            <Transaction data={result}/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
	return {
		transactions: state.transactions
	};
};

export default connect(mapStateToProps,null)(Withdraw);