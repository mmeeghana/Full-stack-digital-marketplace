import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Signin from './pages/signin';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import CreateProduct from './pages/CreateProduct';
import Marketplace from './pages/Marketplace';
import UpdateProduct from './pages/UpdateProduct';
function App() {

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/marketplace" element={<Marketplace />} /> 
          <Route path='/update-product/' element={<UpdateProduct/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
