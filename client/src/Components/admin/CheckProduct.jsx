import React from 'react'
import Header from '../../Layouts/Header'
import AdminMenu from './AdminMenu'

function CheckProduct() {
  return (
    <>
        <Header/>
        <div className=' flex'>
        <AdminMenu/>
        <div>
          <h1 className=' text-center items-center text-4xl'>All Products</h1>
        </div>
        </div>
    </>
  )
}

export default CheckProduct