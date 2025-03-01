import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Layout({ token, setToken }) {
  return (
    <div>
      <Navbar setToken={setToken} token={token} />
      <div className="pt-30"> 
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;