import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Herosection from './Components/Herosection/Herosection.jsx'
import Form from './Components/Form/Form.jsx'
import Services from './Components/Services/Services.jsx'
import Login from './Components/Login/Login.jsx'
import Signup from './Components/Signup/Signup.jsx'
import Contact from './Components/Contact/Contact.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Herosection/>} />
      <Route path='Services' element={<Services/>} />
      <Route path='appointment' element={<Form/>} />
      <Route path='Login' element={<Login/>} />
      <Route path='Signup' element={<Signup/>} />
      <Route path='Contact' element={<Contact/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
