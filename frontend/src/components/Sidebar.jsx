import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaHistory,
  FaChartBar,
  FaUser,
  FaWallet,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Add Expense", path: "/add-expense", icon: <FaPlusCircle /> },
    { name: "Expense History", path: "/history", icon: <FaHistory /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> }
  ];

  return (
    <>
      {/* TOP BAR (Mobile only) */}
      <div className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3 text-white md:hidden">
        <div className="flex items-center gap-2">
          <FaWallet className="text-cyan-400" />
          <span className="font-bold">Expense Tracker</span>
        </div>

        <button onClick={() => setOpen(true)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* OVERLAY (Mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen w-72 max-w-[85vw] z-50 shrink-0
          bg-slate-950 text-white border-r border-slate-800
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl">
              <FaWallet size={22} />
            </div>

            <div>
              <h1 className="font-bold text-lg">Expense Tracker</h1>
              <p className="text-slate-400 text-xs">Smart Finance</p>
            </div>
          </div>

          {/* CLOSE BUTTON (mobile only) */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 p-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "hover:bg-slate-800"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
