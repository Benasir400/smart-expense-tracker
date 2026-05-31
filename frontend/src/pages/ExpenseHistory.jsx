import Sidebar from "../components/Sidebar";

import ExpenseList from "../components/ExpenseList";

function ExpenseHistory() {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8 bg-gray-100 min-h-screen">

                <div className="bg-white p-5 rounded shadow">

                    <h1 className="text-3xl font-bold mb-5">

                        Expense History

                    </h1>

                    <ExpenseList />

                </div>

            </div>

        </div>
    );
}

export default ExpenseHistory;
