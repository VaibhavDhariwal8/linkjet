import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StatsGrid from "../components/dashboard/StatsGrid";
import LinksTable from "../components/dashboard/LinksTable";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="text-slate-900 pb-20">
      <Header />
      <main className="max-w-6xl mx-auto mt-28 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              Your Dashboard
            </h1>
            <p className="text-gray-500 font-medium">
              Manage and track your shortened URLs.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Shorten New Link
          </button>
        </div>
        <StatsGrid />
        <LinksTable />
      </main>

      <Footer />
    </div>
  );
}
