import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Alert from './components/Alert'
import MyState from './context/MyState'
import './App.css'
export default function App() {

    return (
        <MyState>
            <Navbar />
            <Alert/>
            <Outlet />
        </MyState>
    )
}
