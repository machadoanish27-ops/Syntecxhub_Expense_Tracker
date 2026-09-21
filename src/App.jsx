import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import Dashboard from "./components/Dashboard"

const API_URL = "http://localhost:3001/expenses"

function App() {
  const [expenses, setExpenses] = useState([])
  const [editingExpense, setEditingExpense] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch expenses from mock API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true)
        setError("")

        const response = await axios.get(API_URL)

        setExpenses(response.data)
      } catch (err) {
        console.error("Failed to fetch expenses:", err)
        setError("Unable to load expenses. Please check the API server.")
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [])

  // Add expense
  const addExpense = useCallback(async (expense) => {
    try {
      const response = await axios.post(API_URL, expense)

      setExpenses((current) => [response.data, ...current])
    } catch (err) {
      console.error("Failed to add expense:", err)
      setError("Unable to add expense.")
    }
  }, [])

  // Delete expense
  const deleteExpense = useCallback(async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)

      setExpenses((current) =>
        current.filter((expense) => expense.id !== id)
      )
    } catch (err) {
      console.error("Failed to delete expense:", err)
      setError("Unable to delete expense.")
    }
  }, [])

  // Edit expense
  const editExpense = useCallback(async (updatedExpense) => {
    try {
      const response = await axios.put(
        `${API_URL}/${updatedExpense.id}`,
        updatedExpense
      )

      setExpenses((current) =>
        current.map((expense) =>
          expense.id === updatedExpense.id
            ? response.data
            : expense
        )
      )
    } catch (err) {
      console.error("Failed to edit expense:", err)
      setError("Unable to edit expense.")
    }
  }, [])

  // Calculate total using useMemo
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
  <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/20">
          ₹
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Expense Tracker
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your spending with ease.
          </p>
        </div>
      </div>
    </div>

    <div className="text-left sm:text-right">
      <p className="text-xs uppercase tracking-wider text-slate-600">
        Personal Finance
      </p>

      <p className="mt-1 text-sm font-medium text-slate-400">
        Smart • Simple • Organized
      </p>
    </div>
  </div>
</header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {loading && (
          <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-5 text-center text-slate-400">
            Loading expenses...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-900 bg-red-950 p-5 text-center text-red-300">
            {error}
          </div>
        )}

        {!loading && (
          <Dashboard
  expenses={expenses}
  onAddExpense={addExpense}
  onDeleteExpense={deleteExpense}
  onEditExpense={editExpense}
  editingExpense={editingExpense}
  onStartEdit={setEditingExpense}
  onCancelEdit={() => setEditingExpense(null)}
/>
        )}
      </main>
    </div>
  )
}

export default App