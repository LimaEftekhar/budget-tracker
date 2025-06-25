import { useRef } from "react"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext"

export default function AddBudgetModal({ show, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { addExpense, budgets } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })
    handleClose()
  }

  if (!show) return null

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={handleClose} style={closeButtonStyle}>&times;</button>
        <h2>New Expense</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            ref={descriptionRef}
            required
            style={inputStyle}
          />

          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            ref={amountRef}
            type="number"
            required
            min="0"
            step="0.01"
            style={inputStyle}
          />

          <label htmlFor="budgetId">Budget</label>
          <select
      
            defaultValue={defaultBudgetId}
            ref={budgetIdRef}
            style={inputStyle}>

            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
            {budgets.map(budget => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
          </select>

          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <button type="submit" style={submitButtonStyle}>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

//styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
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
  maxWidth: "400px",
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

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginTop: "0.25rem",
  marginBottom: "1rem",
  boxSizing: "border-box",
}

const submitButtonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
}