import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Fees from "./pages/Fees"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Courses from './pages/Courses'
import Math from './pages/math/Math'
import Science from './pages/science/Science'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import ProtectedAdmin from './components/ProtectedAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import ClassInfo from './pages/math/ClassInfo'
import ScienceClassInfo from './pages/science/ClassInfo'
import Performance from './pages/math/Performance'
import SciencePerformance from './pages/science/Performance'
import Material from './pages/math/Material'
import ScienceMaterial from './pages/science/Material'
import Schedule from './pages/math/Schedule'
import ScienceSchedule from "./pages/science/Schedule"
// import Fees from "./pages/math/Fees"
import MathFees from "./pages/math/Fees"
import ScienceFees from "./pages/science/Fees"
import FeesPreview from "./components/FeesPreview"
import ScienceFeesPreview from './components/ScienceFeesPreview'
import Contact from './components/Contact'
import NotFound from "./pages/NotFound"
import WhatsappButton from "./components/WhatsappButton"
import ForgotPassword from "./pages/ForgotPassword"
import PrivacyPolicy from "./pages/PrivacyPolicy"


const App = () => {
  return (
    <div className="pt-[72px] bg-[#020617] min-h-screen overflow-x-hidden">

      {/* 🔥 TOAST CONTAINER */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#111827',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '12px 16px',
            borderRadius: '10px'
          }
        }}
      />

      {/* 🔥 NAVBAR */}
      <Navbar/>

      <WhatsappButton />

      {/* 🔥 ROUTES */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        
      <Route
  path='/courses'
  element={
    <ProtectedRoute>
      <Courses/>
    </ProtectedRoute>
  }
/>

<Route
  path='/math'
  element={
    <ProtectedRoute>
      <Math/>
    </ProtectedRoute>
  }
/>


<Route 
  path='/science'
   element={
   <ProtectedRoute>
  <Science/>
  </ProtectedRoute>
  }/>



        <Route
  path="/math/class/:id/info"
  element={
    <ProtectedRoute>
      <ClassInfo />
    </ProtectedRoute>
  }
/>

<Route path="/science/class/:id/info" 
 element={
 <ProtectedRoute>
 <ScienceClassInfo />
 </ProtectedRoute>
 } />

<Route
  path="/math/class/:id/performance"
  element={
    <ProtectedRoute>
      <Performance />
    </ProtectedRoute>
  }
/>

<Route
  path="/science/class/:id/performance"
  element={
    <ProtectedRoute>
      <SciencePerformance />
    </ProtectedRoute>
  }
/>


<Route
  path="/math/class/:id/material"
  element={
    <ProtectedRoute>
      <Material />
    </ProtectedRoute>
  }
/>

<Route
  path="/science/class/:id/material"
  element={
    <ProtectedRoute>
      <ScienceMaterial />
    </ProtectedRoute>
  }
/>

<Route
  path="/math/class/:id/schedule"
  element={
    <ProtectedRoute>
      <Schedule />
    </ProtectedRoute>
  }
/>

<Route
  path="/science/class/:id/schedule"
  element={
    <ProtectedRoute>
      <ScienceSchedule />
    </ProtectedRoute>
  }
/>


        

  

        {/* <Route path="/fees" element={<FeesPreview />} /> */}
        <Route path="/fees" element={<Fees />} />
        
        <Route path="/science/fees" element={<ScienceFeesPreview />} />

        <Route path="/science/class/:id/fees" element={<ScienceFees />} />
        <Route path="/math/class/:id/fees" element={<MathFees />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route 
  path='/admin' 
  element={
    <ProtectedAdmin>
      <Admin />
    </ProtectedAdmin>
  } 
/>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
path="/privacy-policy"
element={<PrivacyPolicy />}
/>
        
      </Routes>

    </div>
  )
}

export default App