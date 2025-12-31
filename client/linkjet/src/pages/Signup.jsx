import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../api/auth.api";

const Signup = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signup(form);
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tighter italic text-teal-600"
          >
            LINKJET
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-white p-10 rounded-[40px] shadow-xl shadow-gray-100 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get started</h1>
          <p className="text-gray-500 mb-8 text-sm">
            Join 10,000+ users shortening links daily.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  placeholder="Jane"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  placeholder="Doe"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">
                Work Email
              </label>
              <input
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 8 characters"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-4 rounded-2xl font-bold hover:bg-teal-600 transition-all shadow-lg shadow-teal-100 mt-2"
            >
              Create Free Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
