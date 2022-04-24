import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Sidebar />
            <main>{children}</main>
        </>
    );
}
