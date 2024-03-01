import React from 'react'
import { features } from '../contants'

const Features = () => {
  return (
    <div className='padding-x py-6'>
        <h2 className='heading-text text-primary'> Features </h2>
        
        <div className='grid grid-cols-3 gap-6  text-primary text-center'>
            {features.map((feature)=>{
                return(
                    <div key={feature.name} className='flex flex-col gap-1 border-primary border-2 rounded-lg items-center p-5 hover:bg-secondary hover:text-white-200'>
                        <img src={feature.icon} alt="" width={60} height={60} />
                        <h3 className='font-bold text-xl '>{feature.name}</h3>
                        <p className='text-sm'>{feature.about}</p>

                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Features