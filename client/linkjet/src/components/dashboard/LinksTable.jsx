import { Trash2 } from "lucide-react";
const LinksTable = ({ urls, onDelete }) => {
  if (!urls.length) {
    return (
      <div className="glass-panel py-20 text-center rounded-4xl">
        <p className="text-gray-400 font-medium">No links generated yet.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-4xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-white/20">
            <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Original URL
            </th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Short Link
            </th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">
              Clicks
            </th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Created
            </th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {urls.map((url) => (
            <tr key={url.id} className="link-row">
              <td className="px-8 py-6">
                <p className="text-sm font-semibold truncate max-w-50 text-gray-700">
                  {url.targetURL}
                </p>
              </td>

              <td className="px-8 py-6">
                <span className="text-teal-600 font-bold text-sm">
                  linkjet.co/{url.shortCode}
                </span>
              </td>

              <td className="px-8 py-6 text-center">
                <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold">
                  {url.clicks ?? 0}
                </span>
              </td>

              <td className="px-8 py-6 text-sm text-gray-400 font-medium">
                {new Date(url.createdAt).toLocaleDateString()}
              </td>

              <td className="px-8 py-6 text-right">
                <button
                  onClick={() => onDelete(url.id)}
                  className="p-2 rounded-xl action-btn-delete"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinksTable;
