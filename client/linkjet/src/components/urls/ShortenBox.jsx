import { useState } from "react";
import { shortenUrl } from "../../api/urls.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ShortenBox = () => {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  async function handleShorten() {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!url) return;

    try {
      const res = await shortenUrl(token, url, code || undefined);
      setResult(res.data);
    } catch {
      alert("Failed to shorten URL");
    }
  }

  function resetForm() {
    setUrl("");
    setCode("");
    setResult(null);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(`linkjet.co/${result.shortCode}`);
  }

  return (
    <>
      {!result && (
        <div className="max-w-2/3 mx-auto glass-card p-2 rounded-4xl flex flex-col md:flex-row gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL..."
            className="flex-2 bg-transparent px-6 py-5 rounded-2xl outline-none text-gray-800 font-medium"
          />

          <div className="flex-1 flex items-center bg-gray-50/50 rounded-2xl px-4">
            <span className="text-gray-400 text-sm font-semibold">
              linkjet.co/
            </span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="alias (optional)"
              className="bg-transparent outline-none text-teal-600 font-bold w-full ml-1 text-sm"
            />
          </div>

          <button
            onClick={handleShorten}
            className="bg-black text-white px-10 py-5 rounded-[26px] font-bold hover:bg-gray-800 transition"
          >
            Shorten Now
          </button>
        </div>
      )}

      {result && (
        <div className="max-w-2xl mx-auto glass-card p-4 rounded-4xl fade-in border-teal-200 bg-teal-50/30">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 ml-4">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white">
                ✓
              </div>
              <div>
                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                  Link Created!
                </p>
                <p className="text-xl font-extrabold text-gray-900">
                  linkjet.co/{result.shortCode}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="bg-white border hover:bg-gray-100 border-gray-200 px-6 py-4 rounded-2xl font-bold"
              >
                Copy
              </button>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 px-4"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShortenBox;
