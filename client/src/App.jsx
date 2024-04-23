import React from 'react'

import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Error from './Components/Error'
import Register from './Components/Register'
import Login from './Components/Login'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/users/Dashboard'
import PrivateRoute from './Components/routes/Private'
import ResetPassword from './Components/ResetPassword'
import AdminRoute from './Components/routes/AdminRoute'
import AdminDashboard from './Components/admin/AdminDashboard'
import CreateProduct from './Components/admin/CreateProduct'
import CreateCatagory from './Components/admin/CreateCatagory'
import Users from './Components/admin/Users'
import CheckProduct from './Components/admin/CheckProduct'
import Orders from './Components/users/Orders'
import Profile from './Components/users/Profile'
import Products from './Components/admin/Products'
import UpdateProduct from './Components/admin/UpdateProduct'
import Serach from './Components/Serach'
import ProductDetail from './Components/ProductDetail'
import Categories from './Components/Categories'
import CategoryProduct from './Components/CategoryProduct'
import MyCart from './Components/MyCart'
import Hero from './Components/Hero'




function App() {
  return (
    <>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/' element={<Hero/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/cart' element={<MyCart/>}/>
      <Route path='/category/:slug' element={<CategoryProduct/>}/>
      <Route path='/search' element={<Serach/>}/>
      <Route path='/product/:slug' element={<ProductDetail/>}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/orders' element={<Orders/>}/>
      <Route path='user/profile' element={<Profile/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/create-category' element={<CreateCatagory/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/products/:slug' element={<UpdateProduct/>}/>
        <Route path='admin/create-products' element={<CreateProduct/>}/>
        <Route path='admin/check-products' element={<CheckProduct/>}/>
        <Route path='admin/users' element={<Users/>}/>
      </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ResetPassword/>}/>
      <Route path='*' element={<Error/>}/>
      
    </Routes>
    <ToastContainer position='top-center'/>
    </>
    
  )
}

export default App