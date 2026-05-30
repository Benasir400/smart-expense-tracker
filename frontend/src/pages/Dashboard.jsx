import { useNavigate }
from "react-router-dom";

import {
    FaWallet
} from "react-icons/fa";

import {
    MdLogout
} from "react-icons/md";

function Dashboard() {

    const navigate =
        useNavigate();

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        navigate("/");
    };

    return (

        <div className="bg-black text-white p-4 md:p-5 shadow flex flex-col md:flex-row justify-between items-center gap-4">

            <div className="flex items-center gap-3">

                <FaWallet
                    className="text-4xl text-green-400"
                />

                <div>

                    <h1 className="text-2xl md:text-4xl font-bold">
                        Smart Expense Tracker
                    </h1>

                    <p className="mt-1 text-gray-300 text-sm md:text-base">
                        Manage your expenses efficiently
                    </p>

                </div>

            </div>

            <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded flex items-center gap-2"
            >

                <MdLogout />

                Logout

            </button>

        </div>
    );
}

export default Dashboard;
