import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Contact from "../components/Contact"
import FeesPreview from "../components/FeesPreview"
import ScienceFeesPreview from '../components/ScienceFeesPreview'
import Footer from "../components/Footer"





const Home = () => {
  return (
    <div>
      <Hero/>

{/* 🔥 DIVIDER HERE */}
      
      <div className="w-full h-px relative mt-3 z-10">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
</div>



      <About/>

      {/* 🔥 DIVIDER */}
<div className="w-full h-px relative mt-3 z-10">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
</div>




<FeesPreview/>

<ScienceFeesPreview/>


 {/* 🔥 DIVIDER */}
<div className="w-full h-px relative mt-3 z-10">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
</div>
   <Contact />

    <Footer />
  
      
    </div>
  )
}

export default Home
