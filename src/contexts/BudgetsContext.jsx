import React, { useContext, useCallback } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets(){
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({children}) =>{
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])

//Callback
    const getBudgetExpenses = useCallback(
    (budgetId) => {
      return expenses.filter((expense) => expense.budgetId === budgetId);
    },
    [expenses],
  );
    function addExpense ({description, amount, budgetId}){
        setExpenses(pervExpenses =>{

            return[...pervExpenses, {id: uuidV4(), description, amount, budgetId}]
        })

    }
    function addBudget ({name, max}){
        setBudgets(pervBudgets =>{

            if (pervBudgets.find(budget => budget.name === name)){
                return pervBudgets
            }
            return[...pervBudgets, {id: uuidV4(), name, max}]
        })

    }
    function deleteBudget ({id}){
        //add the deleted budget to uncategorized section
        setExpenses(pervExpenses =>{
            return pervExpenses.map(expense =>{
                if (expense.budgetId !== id) return expense
                return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })
        setBudgets(pervBudgets =>{
            return pervBudgets.filter(budget => budget.id !== id)
        })

    }
    function deleteExpense ({id}){
        setExpenses(pervExpenses =>{
            return pervExpenses.filter(expense => expense.id !== id)
        })

    }

    function editExpense({ id, description, amount, budgetId }) {
  setExpenses(prevExpenses =>
    prevExpenses.map(exp =>
      exp.id === id ? { ...exp, description, amount, budgetId } : exp
    )
  )
}
    
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
            editExpense,
        }}>{children}</BudgetsContext.Provider>
    )
}