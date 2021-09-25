import React from 'react';

const Transaction = (props) => {
    return(
        <div className="curr-dom-list">
            {props.data.length > 0 ? <span className="text-decoration-underline">Available Denomination (Currency Notes)</span> : ''}
            {
                props.label === 'deposit' ?
                props.data.sort((a, b) => b.currency - a.currency).map(val => {
                    return (<span key={val}>Rs . {val.currency} X {val.quantity} = {val.currency * val.quantity}</span>
                    )
                })
                :
                props.data.map(item => {
                    return(
                     Object.keys(item).map(key => {
                             if(item[key] !== 0) {
                             return(
                                 <span>Rs . {key} X {item[key]} = {key * item[key]}</span>
                             )}
                     }))
                     
                 })
            }
        </div>
    )
}

export default Transaction;