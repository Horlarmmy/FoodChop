import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Features from './Features'
import Cta from './Cta'
import Contact from './Contact'
import Footer from './Footer'



const Index = () => {
  return (
    <div className='pt-5'>
        <Navbar/>
        <Hero/>
        <About/>
        <Features/>
        <Cta/>
        <Contact/>
        <Footer/>
        

    </div>
  )
}

export default Index