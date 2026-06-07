
import ExpenseList from "../components/ExpenseList";
import { FaChartLine, FaHistory, FaReceipt, FaSearch } from "react-icons/fa";

function ExpenseHistory() {

   return (
  <div className="min-h-screen w-full space-y-5 p-4 sm:p-5 md:space-y-6 md:p-8">

    {/* Header */}
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg sm:p-5 md:rounded-3xl md:p-6">

      <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:gap-4 md:text-left">

        <div className="mx-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3 md:mx-0 md:p-4">
          <FaHistory className="text-white text-xl md:text-2xl" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white md:text-4xl">
            Expense History
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-1">
            View and manage all your expense records
          </p>
        </div>

      </div>

    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
        <FaReceipt className="mb-3 text-xl text-cyan-400" />
        <p className="text-sm text-slate-300">All Records</p>
        <h2 className="text-lg font-semibold text-white">Complete history</h2>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
        <FaSearch className="mb-3 text-xl text-blue-400" />
        <p className="text-sm text-slate-300">Search</p>
        <h2 className="text-lg font-semibold text-white">Find quickly</h2>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
        <FaChartLine className="mb-3 text-xl text-green-400" />
        <p className="text-sm text-slate-300">Manage</p>
        <h2 className="text-lg font-semibold text-white">Edit or delete</h2>
      </div>
    </div>

    {/* List */}
    <div className="rounded-2xl border border-white/10 bg-white/10 p-2 sm:p-4 md:rounded-3xl md:p-6">
      <ExpenseList />
    </div>

  </div>
);
}

export default ExpenseHistory;
