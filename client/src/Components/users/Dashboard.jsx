import React from 'react'
import Header from '../../Layouts/Header'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/auth'

function Dashboard() {

  const [auth] = useAuth()
  return (
    <>
    <Header/>
      <div className="flex">
            <UserMenu/>
            <main className="ml-64 p-6">
                <h1 className="text-2xl font-semibold mb-4"></h1>
                <h2>User Name: { auth?.user?.name}</h2>
                <h2>User Email: { auth?.user?.email}</h2>
                <h2>User Phone No:{ auth?.user?.phone}</h2>
            </main>
        </div>
    </>
  )
}

export default Dashboard