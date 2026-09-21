import { useMemo } from "react"

function SummaryCards({ expenses }) {
  const stats = useMemo(() => {
    const total = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    )

    const today = new Date().toISOString().split("T")[0]

    const todayTotal = expenses
      .filter((expense) => expense.date === today)
      .reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      )

    return {
      total,
      todayTotal,
      transactions: expenses.length,
    }
  }, [expenses])

  const cards = [
    {
      title: "Total Expenses",
      value: `₹${stats.total.toLocaleString("en-IN")}`,
      icon: "₹",
      description: "Overall spending",
    },
    {
      title: "Today's Spending",
      value: `₹${stats.todayTotal.toLocaleString("en-IN")}`,
      icon: "◷",
      description: "Spent today",
    },
    {
      title: "Transactions",
      value: stats.transactions,
      icon: "#",
      description: "Total records",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/50"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">
                {card.title}
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                {card.value}
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                {card.description}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-lg font-bold text-indigo-400">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards