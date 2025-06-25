import React from 'react'
import BudgetCard from './BudgetCard'
import { useBudgets } from '../contexts/BudgetsContext'

export default function TotalBudgetCard() {
    const {expenses, budgets} = useBudgets()

    const amount = expenses.reduce((total, expense) => {
    const value = parseFloat(expense.amount);
        return total + (isNaN(value) ? 0 : value);
    }, 0);

    const max = budgets.reduce((total, budget) => {
    const value = parseFloat(budget.max);
      return total + (isNaN(value) ? 0 : value);
    }, 0);
    if(max === 0) return null
    return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons/>
}
