import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
const Applayout = () => {
    return (
        <>
            <Navbar />
            <main className='mt-16'>
                <Outlet />
            </main>
        </>
    )
}

export default Applayout