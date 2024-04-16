import { bg0 } from "../../assets/images";
import { order } from "../../assets/icons";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center py-10 text-center leading-7 padding-x">
      <div>
        <h1 className="text-4xl md:text-6xl text-left font-bold text-primary">
          All Food is Available
          <br />
          at
          <span className="text-secondary"> FoodChop</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-left mt-5">
          Taste the <span>world,</span> one bite at a time
        </h2>
        <div className="gap-4 flex justify-left mt-5">
          <Link to={"/food"}>
            <button className="bg-secondary active:bg-primary active:text-white text-sm md:text-xl py-3 md:py-4 text-white font-bold px-4 rounded-md">
              <img
                src={order}
                className="inline pr-2"
                alt=""
                width={30}
                height={30}
              />
              Order Now
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <img src={bg0} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Hero;