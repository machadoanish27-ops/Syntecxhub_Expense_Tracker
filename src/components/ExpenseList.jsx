import { useMemo, useState } from "react"

const categoryStyles = {
  Food: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Travel: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Shopping: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Bills: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Entertainment: "bg-green-500/10 text-green-400 border-green-500/20",
  Other: "bg-slate-500/10 text-slate-400 border-slate-500/20",
}

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesCategory =
        category === "All" || expense.category === category

      return matchesSearch && matchesCategory
    })
  }, [expenses, search, category])

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Recent Expenses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your transactions
            </p>
          </div>

          <div className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
            {filteredExpenses.length} / {expenses.length}
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
        >
          <option>All</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
      </div>

      {/* Expense List */}
      {filteredExpenses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-800 py-12 text-center">
          <div className="text-3xl">⌕</div>

          <p className="mt-3 text-sm font-medium text-slate-400">
            No expenses found
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="group rounded-xl border border-slate-800 bg-slate-950 p-4 transition duration-200 hover:border-slate-700 hover:bg-slate-900/70"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Expense information */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-slate-300">
                    {expense.title.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-medium text-white">
                      {expense.title}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs ${
                          categoryStyles[expense.category] ||
                          categoryStyles.Other
                        }`}
                      >
                        {expense.category}
                      </span>

                      <span className="text-xs text-slate-600">
                        •
                      </span>

                      <span className="text-xs text-slate-500">
                        {expense.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount + Actions */}
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="font-semibold text-white">
                    ₹{Number(expense.amount).toLocaleString("en-IN")}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onEditExpense(expense)}
                      className="text-sm text-indigo-400 transition hover:text-indigo-300"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-sm text-red-400 transition hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExpenseList