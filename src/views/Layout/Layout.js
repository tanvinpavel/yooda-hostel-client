import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './layout.css';

const Layout = () => {
    return (
        <>
            <header><Header/></header>
            <main className='block-hight'><Outlet/></main>
            <footer><Footer/></footer>
        </>
    );
};

export default Layout;