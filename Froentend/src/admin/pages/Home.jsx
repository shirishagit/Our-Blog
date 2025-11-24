import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import ListBlog from './ListBlog'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
    <Navbar/>
    <Header/>
    <ListBlog/>
    <NewsLetter/>
    <Footer/>
    </>
  )
}

export default Home
