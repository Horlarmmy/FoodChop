import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Features from './Features'
import Steps from './Steps'
import Cta from './Cta'
import Contact from './Contact'
import Footer from './Footer'



const Index = () => {
  return (
    <div className='py-5'>
        <Navbar/>
        <Hero/>
        <About/>
        <Features/>
        <Steps/>
        <Cta/>
        <Contact/>
        <Footer/>
        

    </div>
  )
}

export default Index