import { useState } from "react";
import { shortenUrl } from "../../api/urls.api";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ShortenBox = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const { token } = useAuth();

  async function handleShorten() {
    if (!token) {
      navigate("/login");
      return;
    }
    const res = await shortenUrl(token, url);
    setResult(res.data);
  }

  return (
    <>
      <div className="mt-14 max-w-2xl mx-auto glass-card p-2 rounded-4xl flex flex-col md:flex-row gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-long-complicated-link.com/..."
          className="flex-1 bg-transparent px-6 py-5 rounded-2xl outline-none text-gray-800 font-medium placeholder:text-gray-400"
        />
        <button
          onClick={handleShorten}
          className="bg-black text-white px-10 py-5 rounded-[26px] font-bold hover:bg-gray-800 transition-all shadow-xl active:scale-95"
        >
          Shorten Now
        </button>

        {result && (
          <p className="mt-4">
            Short link:{" "}
            <a
              href={`http://localhost:8000/urls/${result.shortCode}`}
              target="_blank"
            >
              {result.shortCode}
            </a>
          </p>
        )}
      </div>
    </>
  );
};

export default ShortenBox;
