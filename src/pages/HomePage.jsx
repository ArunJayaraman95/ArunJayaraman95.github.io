import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Contact from '../components/Contact/Contact'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Experience from '../components/Experience/Experience'
import Projects from '../components/Projects/Projects'
import Footer from '../components/Footer/Footer'

const TestPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      {/* <Projects /> */}
      <Footer />
    </>
  )
}

export default TestPage