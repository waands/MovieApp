import React, { Children } from 'react'
import Navbar from '../components/Navbar';

function Layout() {
  return (
    <div>
        <Navbar />
        <main className='container mx-auto mt-4'>
            {children}
        </main>
    </div>
  )
}

export default Layout