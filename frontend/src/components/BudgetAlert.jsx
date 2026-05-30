import { useEffect, useState } from "react";

import { getExpenses }
from "../services/expenseService";

function BudgetAlert() {

    const [expenses, setExpenses] =
        useState([]);

    const budgetLimit = 10000;

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {

        try {

            const response =
                await getExpenses();

            setExpenses(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const totalExpense =
        expenses.reduce(
            (total, item) =>
                total + Number(item.amount),
            0
        );

    return (

        <div className="p-5">

            {totalExpense > budgetLimit && (

                <div className="bg-red-500 text-white p-4 rounded shadow">

                    Warning! Budget limit exceeded.

                    Total Expense:
                    ₹ {totalExpense}

                </div>
            )}

        </div>
    );
}

export default BudgetAlert;
