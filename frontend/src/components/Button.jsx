
const Button = ({content}) => {
  return (
    <div>
      <button className='bg-secondary text-white md:py-4 py-1 md:text-xl text-base md:font-semibold font-medium hover:bg-secondary/95 hover:text-white active:bg-primary active:text-white md:px-4 px-1 rounded-md'>
        {content}
      </button>
    </div>
  )
}

export default Button