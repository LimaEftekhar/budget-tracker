import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"
import { useState } from "react"

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense, editExpense } = useBudgets()
  const [editingExpense, setEditingExpense] = useState(null)

  if (!budgetId) return null

  const expenses = getBudgetExpenses(budgetId)

  const budget =
    budgetId === UNCATEGORIZED_BUDGET_ID
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId)

  function handleDeleteBudget() {
    deleteBudget(budget)
    handleClose()
  }

  function handleEditSubmit(e) {
    e.preventDefault()
    const form = e.target
    editExpense({
      id: editingExpense.id,
      description: form.description.value,
      amount: parseFloat(form.amount.value),
      budgetId: editingExpense.budgetId,
    })
    setEditingExpense(null)
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={handleClose} style={closeButtonStyle}>&times;</button>
        <div style={headerStyle}>
          <h2 style={{ margin: 0 }}>Expenses - {budget?.name}</h2>
          {budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <button onClick={handleDeleteBudget} style={deleteBudgetButtonStyle}>
              Delete Budget
            </button>
          )}
        </div>

        <div style={bodyStyle}>
          {expenses.map(expense => (
            <div key={expense.id} style={expenseRowStyle}>
              <div style={descriptionStyle}>{expense.description}</div>
              <div style={amountStyle}>{currencyFormatter.format(expense.amount)}</div>
              <div style={buttonGroupStyle}>
                <button onClick={() => setEditingExpense(expense)} style={editExpenseButtonStyle}>✎</button>
                <button onClick={() => deleteExpense(expense)} style={deleteExpenseButtonStyle}>&times;</button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingExpense && (
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <button onClick={() => setEditingExpense(null)} style={closeButtonStyle}>&times;</button>
              <h3>Edit Expense</h3>
              <form onSubmit={handleEditSubmit}>
                <label>Description</label>
                <input
                  name="description"
                  defaultValue={editingExpense.description}
                  required
                  style={inputStyle}
                />
                <label>Amount</label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={editingExpense.amount}
                  required
                  style={inputStyle}
                />
                <div style={{ textAlign: "right", marginTop: "1rem" }}>
                  <button type="submit" style={submitButtonStyle}>Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


//style

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
}

const modalStyle = {
  backgroundColor: "#fff",
  padding: "1.5rem",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "500px",
  position: "relative",
  boxSizing: "border-box",
}

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  fontSize: "1.5rem",
  border: "none",
  background: "none",
  cursor: "pointer",
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1.5rem",
  marginBottom: "1.5rem",
}

const deleteBudgetButtonStyle = {
  padding: "0.3rem 0.6rem",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
}

const bodyStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}

const expenseRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  paddingBottom: "0.5rem",
  gap: "1rem",
}

const descriptionStyle = {
  flex: 1,
  fontWeight: "bold",
}

const amountStyle = {
  fontSize: "1rem",
  color: "#555",
}

const buttonGroupStyle = {
  display: "flex",
  gap: "0.5rem",
}

const editExpenseButtonStyle = {
  backgroundColor: "transparent",
  color: "#007bff",
  fontSize: "1.2rem",
  border: "none",
  cursor: "pointer",
}

const deleteExpenseButtonStyle = {
  backgroundColor: "transparent",
  color: "#dc3545",
  fontSize: "1.2rem",
  border: "none",
  cursor: "pointer",
}

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginTop: "0.25rem",
  marginBottom: "1rem",
  boxSizing: "border-box",
}

const submitButtonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "var(--green-color)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
}