import { useEffect, useState } from "react";

import { getExpenses } from "../services/expenseService";

function BudgetAlert() {
    const [expenses, setExpenses] = useState([]);

    const budgetLimit = 10000;

    useEffect(() => {
        let isMounted = true;

        const fetchExpenses = async () => {
            try {
                const response = await getExpenses();
                if (isMounted) setExpenses(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchExpenses();

        return () => {
            isMounted = false;
        };
    }, []);

    const totalExpense = expenses.reduce(
        (total, item) => total + Number(item.amount),
        0
    );

    return (
        <div className="p-5">
            {totalExpense > budgetLimit && (
                <div className="bg-red-500 text-white p-4 rounded shadow">
                    Warning! Budget limit exceeded.
                    <br />
                    Total Expense: Rs. {totalExpense}
                </div>
            )}
        </div>
    );
}

export default BudgetAlert;
