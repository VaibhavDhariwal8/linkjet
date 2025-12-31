import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserUrls } from "../api/urls.api";
import { useAuth } from "../context/AuthContext";
import { deleteUrl } from "../api/urls.api";
import { getTopRegion } from "../api/stats.api";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StatsGrid from "../components/dashboard/StatsGrid";
import LinksTable from "../components/dashboard/LinksTable";

export default function Dashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [urls, setUrls] = useState([]);
  const [topRegion, setTopRegion] = useState(null);

  useEffect(() => {
    if (!token) return;

    const refreshStats = async () => {
      try {
        const urlsRes = await getUserUrls(token);
        setUrls(urlsRes);

        try {
          const regionRes = await getTopRegion(token);
          setTopRegion(regionRes?.country ?? null);
        } catch {
          setTopRegion(null); // graceful fallback
        }
      } catch {
        alert("Failed to load dashboard");
      }
    };

    refreshStats();

    const onFocus = () => {
      if (document.visibilityState === "visible") {
        refreshStats();
      }
    };

    document.addEventListener("visibilitychange", onFocus);
    return () => document.removeEventListener("visibilitychange", onFocus);
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteUrl(token, id);

      // Optimistic UI update
      setUrls((prev) => prev.filter((url) => url.id !== id));
    } catch (err) {
      alert("Failed to delete link");
    }
  };

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
        <StatsGrid urls={urls} topRegion={topRegion} />
        <LinksTable urls={urls} onDelete={handleDelete} />
      </main>

      <Footer />
    </div>
  );
}
