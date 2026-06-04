import Sidebar from "../components/Sidebar";
import ExpenseList from "../components/ExpenseList";
import { FaHistory } from "react-icons/fa";

function ExpenseHistory() {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">

                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />

                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />

                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">

                    {/* Header */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8 shadow-lg">

                        <div className="flex items-center gap-4">

                            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl">

                                <FaHistory className="text-white text-2xl" />

                            </div>

                            <div>

                                <h1 className="text-4xl font-bold text-white">
                                    Expense History
                                </h1>

                                <p className="text-slate-300 mt-2">
                                    View and manage all your expense records
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Expense List Container */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-6">

                        <ExpenseList />

                    </div>

                </div>

            </div>

        </div>

    );
}

export default ExpenseHistory;