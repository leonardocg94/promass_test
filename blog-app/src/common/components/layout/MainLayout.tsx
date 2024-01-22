import { Outlet } from "react-router-dom";
import { Header } from ".";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "../../hooks";

export const MainLayout = () => {
  useSession();

  return (
    <div className="bg-zinc-100 min-h-screen">
      <div className="container mx-auto min-h-screen px-4">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};
