import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import LatestJobs from '@/components/latestJob'
import Navbar from '@/components/Navbar'
import React from 'react'

const Home = () => {
  return (
    <div>
         <Navbar/>
         <Hero/>
         <LatestJobs/>
         <Footer/>
    </div>
  )
}

export default Home
