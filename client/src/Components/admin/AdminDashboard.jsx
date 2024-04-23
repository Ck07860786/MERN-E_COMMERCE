import React from 'react'
import Header from '../../Layouts/Header'
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/auth'

function AdminDashboard() {
  const [auth] = useAuth()
  return (
    <>
      <Header/>
      <div className="flex">
            <AdminMenu/>
            <main className="ml-64 p-6">
                <h1 className="text-2xl font-semibold mb-4">Dashboard Content</h1>
                <h2>Admin Name: { auth?.user?.name}</h2>
                <h2>Admin Email: { auth?.user?.email}</h2>
                <h2>Admin Phone No:{ auth?.user?.phone}</h2>
            </main>
        </div>
    </>
  )
}

export default AdminDashboard