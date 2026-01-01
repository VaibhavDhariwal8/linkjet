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
    navigator.clipboard.writeText(
      `linkjet.vaibhavdhariwal.site/${result.shortCode}`
    );
    alert("Link copied!");
  }

  return (
    <div className="w-full px-4">
      {!result && (
        <div className="max-w-4xl mx-auto glass-card p-2 md:p-2 rounded-[32px] flex flex-col md:flex-row gap-2">
          {/* URL Input - Flex-[2] for desktop, full width mobile */}
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL..."
            className="flex-[2] bg-transparent px-6 py-4 md:py-5 rounded-2xl outline-none text-gray-800 font-medium placeholder:text-gray-400"
          />

          {/* Alias Input - Handles the long domain name for small screens */}
          <div className="flex-1 flex items-center bg-gray-50/50 rounded-2xl px-4 py-4 md:py-0 border border-transparent focus-within:border-teal-200 transition-all overflow-hidden">
            <span className="text-gray-400 text-xs md:text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] md:max-w-none">
              linkjet.site/
            </span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="alias"
              className="bg-transparent outline-none text-teal-600 font-bold w-full ml-1 text-sm md:text-base placeholder:font-normal"
            />
          </div>

          {/* Button - Full width on mobile */}
          <button
            onClick={handleShorten}
            className="w-full md:w-auto bg-black text-white px-10 py-4 md:py-5 rounded-[24px] font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10"
          >
            Shorten
          </button>
        </div>
      )}

      {result && (
        <div className="max-w-2xl mx-auto glass-card p-4 md:p-6 rounded-[32px] fade-in border-teal-200 bg-teal-50/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="min-w-[48px] h-12 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-teal-500/20 text-xl">
                ✓
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.15em] mb-0.5">
                  Link Created!
                </p>
                <p className="text-lg md:text-xl font-extrabold text-gray-900 truncate">
                  linkjet.site/{result.shortCode}
                </p>
              </div>
            </div>

            <div className="flex w-full md:w-auto gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 md:flex-none bg-white border border-gray-200 px-8 py-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all active:scale-95"
              >
                Copy
              </button>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 px-4 font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenBox;
