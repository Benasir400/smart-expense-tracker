import ExpenseList from "../components/ExpenseList";
import {
  FaHistory,
  // FaReceipt,
  // FaSearch,
} from "react-icons/fa";

function ExpenseHistory() {
  return (
    <div className="min-h-screen w-full space-y-5 p-4 text-white">

      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">

          <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3">
            <FaHistory className="text-xl text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Expense History
            </h1>

            <p className="mt-1 text-sm text-slate-300">
              View and manage all your expense records
            </p>
          </div>

        </div>
      </div>

      {/* Small Summary Cards
      <div className="grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-white/10 p-3">
          <FaReceipt className="mb-2 text-base text-cyan-400" />

          <p className="text-xs text-slate-400">
            Records
          </p>

          <h2 className="text-sm font-semibold">
            Complete History
          </h2>
        </div>

        <div className="rounded-xl bg-white/10 p-3">
          <FaSearch className="mb-2 text-base text-blue-400" />

          <p className="text-xs text-slate-400">
            Search
          </p>

          <h2 className="text-sm font-semibold">
            Find Quickly
          </h2>
        </div>

        

      </div> */}

      {/* Expense List */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
        <ExpenseList />
      </div>

    </div>
  );
}

export default ExpenseHistory;