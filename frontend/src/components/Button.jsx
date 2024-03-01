import React from 'react'

const Button = ({content}) => {
  return (
    <div>
      <button className='bg-secondary text-white py-2 px-4 rounded-md'>
        {content}
      </button>
    </div>
  )
}

export default Button