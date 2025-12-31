import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header
      style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "900px",
        zIndex: 9999,
        borderRadius: "999px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        // These two lines are what your build tool was breaking:
        backdropFilter: "blur(15px) saturate(180%)",
        WebkitBackdropFilter: "blur(15px) saturate(180%)",
      }}
      className="header-pill"
    >
      <div className="px-8 py-3 flex justify-between items-center">
        <div className="font-black text-xl tracking-tighter italic text-teal-600">
          LINKJET
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-[13px] font-semibold text-gray-500">
          <a href="#" className="hover:text-black transition">
            Features
          </a>
          <a href="#" className="hover:text-black transition">
            Benefits
          </a>
          <Link to="/dashboard" className="hover:text-black transition">
            {" "}
            Dashboard
          </Link>
          <div className="w-px h-4 bg-gray-200"></div>
          {!token ? (
            <Link className="hover:text-black transition" to="/login">
              login
            </Link>
          ) : (
            <></>
          )}
        </nav>

        {token ? (
          <div className="flex items-center gap-6">
            {user && (
              <>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Hi, {user.name}
                </span>
                <div className="w-10 h-10 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center font-bold text-teal-700">
                  {user.initials.toUpperCase()}
                </div>
              </>
            )}
            <Link
              onClick={handleLogout}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link
            to="/signup"
            className="bg-black text-white px-6 py-2 rounded-full text-[13px] font-bold hover:bg-gray-800 transition shadow-sm"
          >
            {" "}
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
