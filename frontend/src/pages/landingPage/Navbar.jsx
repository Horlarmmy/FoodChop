import { navLinks } from "../../constants";
import Button from "../../components/Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center padding-x ">
      <a href="" className="font-bold text-3xl text-primary hover:text-secondary">
        {" "}
        FoodChop{" "}
      </a>

      <div className="flex justify-between items-center text-xl font-semibold gap-7 text-md text-primary ">
        {navLinks.map((navlink) => {
          return (
            <ul key={navlink.label}>
              <li>
                <a
                  className="hover:text-secondary ease-in-out delay-200"
                  href={navlink.href}
                >
                  {navlink.label}
                </a>
              </li>
            </ul>
          );
        })}
      </div>

      <Button content="Connect Wallet" />
    </nav>
  );
};

export default Navbar;
