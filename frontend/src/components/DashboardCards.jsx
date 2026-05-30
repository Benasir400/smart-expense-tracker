import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";

function DashboardCards() {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {

        try {

            const response = await getExpenses();

            setExpenses(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // Total Expense
    const totalExpense = expenses.reduce(
        (total, item) =>
            total + Number(item.amount),
        0
    );

    // Unique Categories
    const categories = [
        ...new Set(
            expenses.map((item) => item.category)
        )
    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">

            {/* Total Expense Card */}
            <div className="bg-blue-500 text-white p-5 rounded shadow">

                <h2 className="text-xl font-bold">
                    Total Expense
                </h2>

                <p className="text-3xl mt-2">
                    ₹ {totalExpense}
                </p>

            </div>

            {/* Transactions Card */}
            <div className="bg-green-500 text-white p-5 rounded shadow">

                <h2 className="text-xl font-bold">
                    Transactions
                </h2>

                <p className="text-3xl mt-2">
                    {expenses.length}
                </p>

            </div>

            {/* Categories Card */}
            <div className="bg-purple-500 text-white p-5 rounded shadow">

                <h2 className="text-xl font-bold">
                    Categories
                </h2>

                <p className="text-3xl mt-2">
                    {categories.length}
                </p>

            </div>

        </div>
    );
}

export default DashboardCards;
