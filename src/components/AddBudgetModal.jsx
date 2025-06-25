
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef()
  const maxRef = useRef()
  const { addBudget } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    })
    handleClose()
  }

  if (!show) return null

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={handleClose} style={closeButtonStyle}>&times;</button>
        <h2>New Budget</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            ref={nameRef}
            required
            style={inputStyle}
          />

          <label htmlFor="max">Maximum Spending</label>
          <input
            id="max"
            type="number"
            min="0"
            step="0.01"
            ref={maxRef}
            required
            style={inputStyle}
          />

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