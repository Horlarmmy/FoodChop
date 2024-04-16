import { useState } from "react";
import { navLinks } from "../../constants";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../use-auth-client";
import LoginBtn from "../../components/LoginBtn";
import LoggedOutBtn from "../../components/LoggedOutBtn";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, whoamiActor } = useAuth();
  const [principalId, setPrincipalId] = useState("Hey there");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = async () => {
    if (isAuthenticated) {
      // const whoami = await whoamiActor.whoami();
      // setPrincipalId(whoami);
      setIsProfileOpen(!isProfileOpen);
    }
  };

  return (
    <nav className="flex justify-between items-center padding-x py-2 md:py-1">
      <a
        href=""
        className="font-bold text-2xl md:text-3xl text-primary hover:text-secondary"
      >
        FoodChop
      </a>
      <div className="hidden md:flex justify-between items-center text-md md:text-xl font-semibold gap-7 text-primary">
        {navLinks.map((navlink) => (
          <a
            key={navlink.label}
            href={navlink.href}
            className="hover:text-secondary ease-in-out delay-200"
          >
            {navlink.label}
          </a>
        ))}
        <div className="flex items-center -right-64 gap-4 relative">
          {isAuthenticated ? (
            <LoginBtn content={"log out"} />
          ) : (
            <LoggedOutBtn content={"log in"} />
          )}
          {isAuthenticated && (
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={toggleProfile}
            >
              <FaUserCircle
                className="text-primary hover:text-secondary"
                size={24}
              />
              <span>Profile</span>
              {isProfileOpen && (
                <div className="absolute -right-16 top-9 mt-2 bg-white shadow-lg rounded-md px-4 py-1 w-56">
                  {/* <p>Principal ID: {principalId}</p> */}
                  {/* Add user profile information here */}
                  <p className="px-4 py-2 text-sm text-primary hover:bg-gray-100">
                    Principal ID: {principalId}
                  </p>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-primary hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-primary hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <button
            className="text-primary hover:text-secondary focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 md:hidden left-0 w-full bg-white shadow-lg z-10 rounded-b-lg">
          <ul className="py-4 px-6 space-y-4">
            {navLinks.map((navlink) => (
              <li key={navlink.label}>
                <a
                  href={navlink.href}
                  className="text-primary hover:text-secondary ease-in-out delay-200"
                >
                  {navlink.label}
                </a>
              </li>
            ))}
            <li className="m-1 ml-4">
              {isAuthenticated ? (
                <LoginBtn content={"log out"} />
              ) : (
                <LoggedOutBtn content={"log in"} />
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
