import React from 'react'
import UserMenu from './UserMenu'
import Header from '../../Layouts/Header'

function Orders() {
  return (
    <>
       
      <Header />
      <div className="flex">
        <UserMenu />
        <div className="flex-1 flex justify-center mt-8">
          <h1 className="text-4xl">Your Orders</h1>
        </div>
      </div>
    </>
  )
}

export default Orders