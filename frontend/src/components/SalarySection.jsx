import { useEffect, useState } from "react";
import { saveSalary, getSalary } from "../services/salaryService";

function SalarySection() {

    const [salary, setSalary] = useState("");
    const [savedSalary, setSavedSalary] = useState(null);

    const userId = localStorage.getItem("userEmail");

    const fetchSalary = async () => {
        const res = await getSalary(userId);
        setSavedSalary(res.data);
    };

    useEffect(() => {
        fetchSalary();
    }, []);

    const isLocked = savedSalary !== null;

    const handleSave = async () => {
        try {
            await saveSalary({
                userId,
                salary: salary
            });

            alert("Salary locked for this month");
            fetchSalary();

        } catch (err) {
            alert(err.response?.data || "Error");
        }
    };

    return (
        <div className="bg-white/10 p-6 rounded-2xl">

            <h2 className="text-xl font-bold text-white mb-4">
                Monthly Salary
            </h2>

            {!isLocked ? (
                <div className="flex gap-4">

                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="Enter salary"
                        className="p-3 rounded bg-white/10 text-white w-full"
                    />

                    <button
                        onClick={handleSave}
                        className="bg-blue-500 px-6 py-3 text-white rounded"
                    >
                        Save
                    </button>

                </div>
            ) : (
                <div className="text-white">

                    <h1 className="text-3xl font-bold">
                        ₹ {savedSalary.salary}
                    </h1>

                    <p className="text-green-400 mt-2">
                        🔒 Locked for this month
                    </p>

                </div>
            )}

        </div>
    );
}

export default SalarySection;