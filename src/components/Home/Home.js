import React from 'react'
import {  Outlet } from 'react-router-dom';
import Header from './Header/Header';

const Home = () => {

    return (
        <React.Fragment>
            <Header />
            <div className='mt-14'><Outlet /></div>
        </React.Fragment>
    )
}

export default Home