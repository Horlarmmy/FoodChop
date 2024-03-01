import { bg0, } from '../assets/images'
import { order } from '../assets/icons'

const Hero = () => {
  return (
    <div className='grid grid-cols-2 gap-2 items-center justify-center py-10 text-center leading-7 padding-x '>
      <div>
        <h1 className='text-5xl text-left  font-bold text-primary '>
          All Food is at <br /> Available  { }
          <span className='text-secondary'>
            FoodChop
          </span> { }
        </h1>
        <h2 className='text-xl text-left mt-5'>
          Taste the
          <span> world, </span>
          one bite at a time
        </h2>

        <div className='gap-4 flex justify-left mt-5'>
          
          <button className='bg-secondary text-white text-md font-bold py-2 px-4 rounded-md'> <img src={order} className='inline pr-2' alt="" width={30} height={30} />
            Order Now </button>
        </div>

      </div>
      <div className=''>
        <img src={bg0} alt="" className='w-[200%] h-[200%]' />
      </div>
    </div>
  )
}

export default Hero