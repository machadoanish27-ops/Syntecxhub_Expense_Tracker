import { useEffect, useRef, useState } from "react"

function ExpenseForm({
  onAddExpense,
  editingExpense,
  onUpdateExpense,
  onCancelEdit,
}) {
  const inputRef = useRef(null)

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  })

  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
      })

      setFormError("")
      inputRef.current?.focus()
    }
  }, [editingExpense])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    setFormError("")
  }

  const resetForm = () => {
    setForm({
      title: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    })

    setFormError("")
    inputRef.current?.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim()) {
      setFormError("Please enter an expense title.")
      inputRef.current?.focus()
      return
    }

    if (!form.amount || Number(form.amount) <= 0) {
      setFormError("Please enter a valid amount greater than ₹0.")
      return
    }

    if (!form.date) {
      setFormError("Please select a date.")
      return
    }

    if (editingExpense) {
      await onUpdateExpense({
        ...form,
        title: form.title.trim(),
        amount: Number(form.amount),
        id: editingExpense.id,
      })

      onCancelEdit()
    } else {
      await onAddExpense({
        ...form,
        title: form.title.trim(),
        amount: Number(form.amount),
        id: Date.now(),
      })
    }

    resetForm()
  }

  const handleCancel = () => {
    onCancelEdit()
    resetForm()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {editingExpense ? "Edit Expense" : "Add Expense"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {editingExpense
                ? "Update your transaction details"
                : "Record a new transaction"}
            </p>
          </div>

          {editingExpense && (
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm text-slate-500 transition hover:text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Expense Title
          </label>

          <input
            ref={inputRef}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Lunch, Uber, Netflix"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Amount
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
              ₹
            </span>

            <input
              name="amount"
              type="number"
              min="1"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-9 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Date
          </label>

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
          />
        </div>

        {/* Error */}
        {formError && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {formError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.99]"
        >
          {editingExpense ? "✓ Update Expense" : "+ Add Expense"}
        </button>
      </div>
    </form>
  )
}

export default ExpenseForm