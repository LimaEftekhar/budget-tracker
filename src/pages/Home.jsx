import React from 'react'
import BudgetCard from '../components/BudgetCard'
import UncategorizedBudgetCard from '../components/UncategorizedBudgetCard'
import TotalBudgetCard from '../components/TotalBudgetCard'
import AddBudgetModal from '../components/AddBudgetModal'
import AddExpenseModal from '../components/AddExpenseModal'
import ViewExpensesModal from '../components/ViewExpensesModal'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext'
import { useState } from 'react'

export default function Home() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <div className='container'>
      <div className='top'>
        <h1 className='title'>Budgets</h1>
        <div className='button-items'>
          <button className='button primary' onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </button>
          <button className='button secondary' onClick={openAddExpenseModal}>
            Add Expense
          </button>
        </div>
      </div>
      <hr />

      <div className='card'>
        {budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          )

          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
            />
          )
        })}
        <UncategorizedBudgetCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
        />
        <TotalBudgetCard />
      </div>

      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </div>
  )
}