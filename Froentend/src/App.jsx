import React, { useState } from 'react';

import Layout from './admin/components/Layout';
import Dashboard from  './admin/components/Dashboard';
import Addblog from './admin/components/Addblog';
import BlogList from './admin/components/BlogList';
import Comments from './admin/components/Comments';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate for protected route logic
import Login from './admin/components/Login';
import Home from './admin/pages/Home';
import Blog from './admin/pages/Blog';
import { useAppContext } from './context/appContext';


// Component to handle the Protected Admin Route logic
const AdminRoute = ({ isLoggedIn, element }) => {
  // If the user is logged in, render the element (which is the Layout component in this case)
  // Otherwise, redirect them to the Login page
  return isLoggedIn ? element : <Navigate to="/admin/login" replace />;
};

function App() {

   const {token} = useAppContext();

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>} />
        <Route path='/blog/:id' element={<Blog/>} />
        <Route path='/admin/login' element={<Login/>} />
        <Route 
          path='/admin' 
          element={ token ? <Layout/> : <Login/>} >
          <Route index element={<Dashboard/>} />
          <Route path='addblog' element={<Addblog/>} />
          <Route path='blogList' element={<BlogList/>} /> 
          <Route path='comments' element={<Comments/>} />
        </Route>
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;