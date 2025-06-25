import React from 'react';
import {currencyFormatter} from '../utils';
import '../App.css'

export default function BudgetCard({name, amount, max, gray, hideButtons, onAddExpenseClick, onViewExpensesClick,}){

    const classNames = []
    if(amount > max){
        classNames.push("bg-danger")
    } else if(gray){
        classNames.push("bg-light")
    }
    return(
       <>
         <div className={["budget-container", ...classNames].join(" ")}>
            <div className='budget-card'>
                <div className='text'>{name}</div>
                <div className='currency'>{currencyFormatter.format(amount)} {max && <span className='max'>/{currencyFormatter.format(max)}</span>}</div>
            </div>
            {max &&<progress className={`fill ${getProgressClass(amount, max)}`}  min={0} max={max} value={amount} gray="true"></progress>}
            {!hideButtons &&<div className='expense'>
                <button className="button add-btn" onClick={onAddExpenseClick}>Add Expense</button>
                <button className="button view-btn" onClick={onViewExpensesClick}>View Expenses</button>
            </div>}
        </div>
        
       </>
    )
}

function getProgressClass(amount, max){
    const ratio = amount/max;
if(ratio <= 0.5) return "low"
    if( ratio <= 0.75) return "mid"
    return "high"
}