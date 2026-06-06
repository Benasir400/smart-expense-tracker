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
        <div className="bg-white/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl w-full">

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
                Monthly Salary
            </h2>

            {/* Not Locked */}
            {!isLocked ? (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="Enter salary"
                        className="
                            p-3
                            rounded-lg
                            bg-white/10
                            text-white
                            w-full
                            outline-none
                            border border-white/20
                            text-sm sm:text-base
                        "
                    />

                    <button
                        onClick={handleSave}
                        className="
                            bg-blue-500
                            hover:bg-blue-600
                            px-4 sm:px-6
                            py-3
                            text-white
                            rounded-lg
                            w-full sm:w-auto
                            transition
                            text-sm sm:text-base
                        "
                    >
                        Save
                    </button>

                </div>
            ) : (

                /* Locked */
                <div className="text-white text-center sm:text-left">

                    <h1 className="text-2xl sm:text-3xl font-bold">
                        ₹ {savedSalary.salary}
                    </h1>

                    <p className="text-green-400 mt-2 text-sm sm:text-base">
                        🔒 Locked for this month
                    </p>

                </div>

            )}

        </div>
    );
}

export default SalarySection;