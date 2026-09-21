import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"
import SummaryCards from "./SummaryCards"
import SpendingBreakdown from "./SpendingBreakdown"

function Dashboard({
  expenses,
  onAddExpense,
  onDeleteExpense,
  onEditExpense,
  editingExpense,
  onStartEdit,
  onCancelEdit,
}) {
  return (
    <div className="space-y-6">
      
      {/* Summary Cards */}
      <SummaryCards expenses={expenses} />

      {/* Analytics */}
      <SpendingBreakdown expenses={expenses} />

      {/* Expense Management */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ExpenseForm
          onAddExpense={onAddExpense}
          editingExpense={editingExpense}
          onUpdateExpense={onEditExpense}
          onCancelEdit={onCancelEdit}
        />

        <div className="lg:col-span-2">
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={onDeleteExpense}
            onEditExpense={onStartEdit}
          />
        </div>
      </div>

    </div>
  )
}

export default Dashboard