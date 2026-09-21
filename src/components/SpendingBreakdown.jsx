import { useMemo } from "react"

const categoryStyles = {
  Food: "bg-orange-500",
  Travel: "bg-blue-500",
  Shopping: "bg-pink-500",
  Bills: "bg-purple-500",
  Entertainment: "bg-green-500",
  Other: "bg-slate-500",
}

function SpendingBreakdown({ expenses }) {
  const { categoryData, total, average } = useMemo(() => {
    const totals = {}

    expenses.forEach((expense) => {
      const category = expense.category

      totals[category] =
        (totals[category] || 0) + Number(expense.amount)
    })

    const categoryData = Object.entries(totals).sort(
      (a, b) => b[1] - a[1]
    )

    const total = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    )

    const average =
      expenses.length > 0 ? total / expenses.length : 0

    return {
      categoryData,
      total,
      average,
    }
  }, [expenses])

  const topCategory =
    categoryData.length > 0 ? categoryData[0] : null

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Spending Breakdown */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Spending Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            See where your money is going
          </p>
        </div>

        {categoryData.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 py-10 text-center">
            <p className="text-sm text-slate-500">
              No spending data available.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {categoryData.map(([category, amount]) => {
              const percentage =
                total > 0 ? (amount / total) * 100 : 0

              const barColor =
                categoryStyles[category] ||
                categoryStyles.Other

              return (
                <div key={category}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${barColor}`}
                      />

                      <span className="text-sm font-medium text-slate-300">
                        {category}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-semibold text-white">
                        ₹{amount.toLocaleString("en-IN")}
                      </span>

                      <span className="ml-2 text-xs text-slate-500">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Spending Insights */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Spending Insights
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quick overview of your spending habits
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total Spending
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Average Transaction
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              ₹
              {average.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Top Spending Category
            </p>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-2xl font-bold text-white">
                {topCategory ? topCategory[0] : "—"}
              </p>

              {topCategory && (
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
                  ₹{topCategory[1].toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpendingBreakdown