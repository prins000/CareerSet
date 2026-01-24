import Footer from '@/components/general/Footer'
import Hero from '@/components/landingPage/Hero'
import LatestJobs from '@/components/landingPage/LatestJob'
import Navbar from '@/components/general/Navbar'
import React from 'react'
import useGetJob from '@/hooks/useGetJob'

const Home = () => {
    useGetJob();
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
