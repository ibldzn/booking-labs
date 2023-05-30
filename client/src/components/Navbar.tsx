import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, UserContext } from "../contexts/UserContext";
import { ProfileMenu } from "./ProfileMenu";

export interface NavbarProps {
  setUser: (user: User | null) => void;
}

export const Navbar = ({ setUser }: NavbarProps) => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [showBurger, setShowBurger] = useState(false);

  const logout = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUser(null);
      navigate("/");
    });
  };

  return (
    <nav className="w-full bg-white shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <img src="/logo-2.jpg" alt="logo" className="w-12 h-12 mt-2" />
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setShowBurger((prev) => !prev)}
              >
                {showBurger ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              showBurger ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="/">Home</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="/activities">Aktifitas Lab</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="/schedule">Jadwal</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <ProfileMenu user={user} logout={logout} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
