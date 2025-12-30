import React from "react";

const LinksTable = () => {
  return (
    <>
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
            {/* Row 1 */}
            <tr className="link-row">
              <td className="px-8 py-6">
                <p className="text-sm font-semibold truncate max-w-50 text-gray-700">
                  https://github.com/vaibhav-dhariwal/project-alpha
                </p>
              </td>
              <td className="px-8 py-6">
                <span className="text-teal-600 font-bold text-sm">
                  linkjet.co/alpha-v
                </span>
              </td>
              <td className="px-8 py-6 text-center">
                <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold">
                  1,204
                </span>
              </td>
              <td className="px-8 py-6 text-sm text-gray-400 font-medium">
                Dec 28, 2025
              </td>
              <td className="px-8 py-6 text-right">
                <button className="p-2 rounded-xl action-btn-delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="link-row">
              <td className="px-8 py-6">
                <p className="text-sm font-semibold truncate max-w-50 text-gray-700">
                  https://dribbble.com/shots/239102-SaaS-Dashboard-Minimal
                </p>
              </td>
              <td className="px-8 py-6">
                <span className="text-teal-600 font-bold text-sm">
                  linkjet.co/minimal-ui
                </span>
              </td>
              <td className="px-8 py-6 text-center">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                  842
                </span>
              </td>
              <td className="px-8 py-6 text-sm text-gray-400 font-medium">
                Dec 24, 2025
              </td>
              <td className="px-8 py-6 text-right">
                <button className="p-2 rounded-xl action-btn-delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* EMPTY STATE PLACEHOLDER (Hidden by default)
            <div className="py-20 text-center">
                <p className="text-gray-400 font-medium">No links generated yet.</p>
            </div>  */}
      </div>
    </>
  );
};

export default LinksTable;
