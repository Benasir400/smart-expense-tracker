import { Link, useLocation } from "react-router-dom";
import {
FaHome,
FaPlusCircle,
FaHistory,
FaChartBar,
FaUser,
FaWallet
} from "react-icons/fa";

function Sidebar() {
const location = useLocation();

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

return ( <div className="w-72 min-h-screen bg-slate-950 text-white flex flex-col border-r border-slate-800">

```
  <div className="p-8 border-b border-slate-800">
    <div className="flex items-center gap-3">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl">
        <FaWallet size={24} />
      </div>

      <div>
        <h1 className="font-bold text-xl">
          Expense Tracker
        </h1>

        <p className="text-slate-400 text-sm">
          Smart Finance
        </p>
      </div>
    </div>
  </div>

  <div className="flex-1 p-5">
    <div className="space-y-3">

      {menuItems.map((item) => (

        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300

          ${
            location.pathname === item.path
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg"
              : "hover:bg-slate-800"
          }`}
        >
          <span className="text-xl">
            {item.icon}
          </span>

          <span className="font-medium">
            {item.name}
          </span>
        </Link>

      ))}

    </div>
  </div>

  <div className="p-5 border-t border-slate-800">
    <div className="bg-slate-900 rounded-2xl p-4">
      <p className="text-slate-400 text-sm">
        Monthly Tracking
      </p>

      <h3 className="font-bold text-lg mt-1">
        Finance Dashboard
      </h3>
    </div>
  </div>
</div>

);
}

export default Sidebar;
