import { useState } from "react";
import { FriendsSideBar } from "./FriendsSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <header className={`lg:hidden md:hidden border-b flex`}>
        <button onClick={toggleSidebar} className="lg:hidden md:hidden p-2">
          <span className="block w-6 h-0.5 bg-white mb-2"></span>
          <span className="block w-6 h-0.5 bg-white mb-2"></span>
          <span className="block w-6 h-0.5 bg-white mb-2"></span>
          <span className="">Friends</span>
        </button>
        <h1 className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-6xl font-bold mx-auto">
          Behas
        </h1>
      </header>

      <div className="flex min-h-screen">
        <div
          className={`lg:block md:block ${isSidebarOpen ? "block" : "hidden"}`}
        >
          <FriendsSideBar />
        </div>

        <main className="p-2 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
