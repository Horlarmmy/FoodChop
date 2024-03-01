import React from 'react'
import { navLinks } from '../contants'
import Button from '../components/Button'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center padding-x '>
      <a href="" className='font-semibold text-primary'> FoodChop </a>

      <div className='flex justify-between items-center gap-5 text-md text-primary '>
        {navLinks.map((navlink) => {
          return (
            <ul key={navlink.label}>
              <li>
                <a className='hover:text-secondary ease-in-out delay-200'
                href={navlink.href}>{navlink.label}</a>
              </li>
            </ul>
          )
        })}

      </div>

      <Button content='Connect Wallet'/>
    </nav>
  )
}

export default Navbar