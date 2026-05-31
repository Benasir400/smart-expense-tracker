import {
    Link,
    useLocation
} from "react-router-dom";

import {
    FaHome,
    FaPlusCircle,
    FaHistory,
    FaChartBar,
    FaUser
} from "react-icons/fa";

function Sidebar() {

    const location =
        useLocation();

    const menuItems = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            name: "Add Expense",
            path: "/add-expense",
            icon: <FaPlusCircle />
        },

        {
            name: "Expense History",
            path: "/history",
            icon: <FaHistory />
        },

        {
            name: "Reports",
            path: "/reports",
            icon: <FaChartBar />
        },

        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />
        }
    ];

    return (

        <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

            <h1 className="text-2xl font-bold mb-8 text-center">

                Expense Tracker

            </h1>

            <div className="flex flex-col gap-3">

                {menuItems.map((item) => (

                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-lg transition

                        ${
                            location.pathname === item.path
                            ? "bg-blue-500"
                            : "hover:bg-gray-700"
                        }`}
                    >

                        {item.icon}

                        {item.name}

                    </Link>
                ))}

            </div>

        </div>
    );
}

export default Sidebar;
