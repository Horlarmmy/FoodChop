
const Button = ({content}) => {
  return (
    <div>
      <button className='bg-secondary text-white py-4 text-xl font-semibold hover:bg-secondary/95 hover:text-white active:bg-primary active:text-white px-4 rounded-md'>
        {content}
      </button>
    </div>
  )
}

export default Button