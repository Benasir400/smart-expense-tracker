import Sidebar from "../components/Sidebar";
import ExpenseList from "../components/ExpenseList";
import { FaHistory } from "react-icons/fa";

function ExpenseHistory() {

   return (
<div className="flex flex-col md:flex-row">
   {/* <div className="hidden md:flex w-72 bg-slate-950 border-r border-slate-800"> */}
  <Sidebar />
  {/* </div> */}

  <div className="flex-1 min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

    {/* Header */}
    <div className="bg-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 md:mb-8 shadow-lg">

      <div className="flex items-center gap-3 md:gap-4 flex-col md:flex-row text-center md:text-left">

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 md:p-4 rounded-2xl">
          <FaHistory className="text-white text-xl md:text-2xl" />
        </div>

        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Expense History
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-1">
            View and manage all your expense records
          </p>
        </div>

      </div>

    </div>

    {/* List */}
    <div className="bg-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6">
      <ExpenseList />
    </div>

  </div>

</div>
);
}

export default ExpenseHistory;