import { useState } from 'react';
import { navLinks } from '../../constants';
import Button from '../../components/Button';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center padding-x py-2 md:py-1">
      <a href="" className="font-bold text-2xl md:text-3xl text-primary hover:text-secondary">
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
        <div className="hidden md:block">
          <Button content="Connect Wallet" />
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
          </ul>
          <div className="m-1 ">
          <Button content="Connect Wallet" />
        </div>
        </div>
        
      )}
    </nav>
  );
};

export default Navbar;