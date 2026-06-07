import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white md:flex-row">

            {/* Sidebar (ONLY ONCE HERE) */}
            <Sidebar />

            {/* Page Content */}
            <main className="w-full min-w-0 flex-1 overflow-y-auto">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;
