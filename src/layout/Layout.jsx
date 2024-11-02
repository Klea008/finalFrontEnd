import React from 'react'
import Nav from '../layout/Nav'
import Footer from '../layout/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Nav />
        {/* This div will take up the remaining space */}
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
