import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = await loginApi(email, password);

      login(token);
      navigate("/");

      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
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

        {/* Login Card */}
        <div className="bg-white p-10 rounded-[40px] shadow-xl shadow-gray-100 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Enter your details to manage your links.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2 ml-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-teal-600 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 mt-4"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-600 font-bold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
