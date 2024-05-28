import React from 'react'
import NavigationBar from '../src/components/Navigation Bar/navigationBar'
import {Outlet} from 'react-router-dom'
import Footer from '../src/components/Footer/footer'

function RootLayout() {
  return (
    <div>
        {/* Navigation Bar */}
        <div className="content-container">
          <NavigationBar/>
        </div>
        {/* Place Holder */}
        <div className="container">
          <Outlet/>
        </div>
        {/* Footer
        <div className="footer-container">
          <Footer/>
        </div> */}
    </div>
  )
}

export default RootLayout