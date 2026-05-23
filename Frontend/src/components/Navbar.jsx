import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaBookOpen } from 'react-icons/fa'

const Navbar = () => {

  const navigate = useNavigate()
  const [open, setOpen] = useState()

  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const isAdmin = localStorage.getItem("isAdmin") === "true"
  

  // 🔥 LOGOUT FUNCTION

const [showLogoutModal, setShowLogoutModal] = useState(false)

 const handleLogout = () => {
 
  localStorage.removeItem("isLoggedIn")
localStorage.removeItem("user")
localStorage.removeItem("token")

localStorage.removeItem("isAdmin")
localStorage.removeItem("adminUser")
localStorage.removeItem("adminToken")

  toast.success("Logged out successfully 👋")

  navigate("/")
  setShowLogoutModal(false)

  setTimeout(() => {
    window.location.reload()
  }, 400)
}

  return (
    <nav className="fixed top-0 left-0 w-screen z-50 bg-[#0B1220]/90 backdrop-blur-md border-b border-white/10 text-white px-6 md:px-12 py-4">

      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-8">

          <h1
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xl font-semibold cursor-pointer"
          >
            <FaBookOpen className="text-white text-lg" />
            BrightFuture
          </h1>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">

            <Link to="/" className="hover:text-white">Home</Link>

            {/* ABOUT */}
            <button
              onClick={() => {
                navigate('/')
                setTimeout(() => {
                  const section = document.getElementById('about')
                  if (section) section.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              className="hover:text-white"
            >
              About Us
            </button>

            {/* COURSES */}
            {/* COURSES */}
<button
  onClick={() => {
    if (isLoggedIn) {
      navigate("/courses")
    } else {
      localStorage.setItem("redirectAfterLogin", "/courses")  // 🔥 ADD THIS
      navigate("/signup")
    }
  }}
  className="hover:text-white"
>
  Courses
</button>


<button
  onClick={() => navigate("/fees")}
  className="hover:text-white"
>
  Pricing
</button>


  {/* 🔥 ADMIN BUTTON (SMART) */}
     

      
      <button
  onClick={() => {
    navigate("/")

    setTimeout(() => {
      const section =
        document.getElementById("contact")

      if (section) {
        section.scrollIntoView({
          behavior: "smooth"
        })
      }
    }, 100)
  }}
  className="hover:text-white"
>
  Contact
</button>



            <button
  onClick={() => {
    if (isAdmin) {
      navigate("/admin")
    } else {
      navigate("/admin-login")
    }
  }}
  className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-200 transition"
>
  Admin
</button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4">

          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="border px-4 py-1.5 rounded-md hover:bg-white hover:text-black transition">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="border px-4 py-1.5 rounded-md hover:bg-white hover:text-black transition">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="border px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          )}

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
  <div className="md:hidden mt-4">

    <div className="flex flex-col gap-5 text-gray-300 text-base px-2 py-4 bg-[#0B1220] rounded-lg animate-slideDown">

      {/* LINKS */}
      <Link 
        to="/" 
        onClick={() => setOpen(false)} 
        className="hover:text-white py-1"
      >
        Home
      </Link>

      <button
        onClick={() => {
          setOpen(false)
          navigate('/')
          setTimeout(() => {
            const section = document.getElementById('about')
            if (section) section.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }}
        className="text-left hover:text-white py-1"
      >
        About Us
      </button>

      <button
        onClick={() => {
          setOpen(false)
          if (isLoggedIn) {
            navigate("/courses")
          } else {
            localStorage.setItem("redirectAfterLogin", "/courses")
            navigate("/signup")
          }
        }}
        className="text-left hover:text-white py-1"
      >
        Courses
      </button>


      <button
  onClick={() => {
    setOpen(false)
    navigate("/fees")
  }}
  className="text-left hover:text-white py-1"
>
  Pricing
</button>

{/* ADMIN BUTTON MOBILE */}





      <button
  onClick={() => {
    setOpen(false)

    navigate("/")

    setTimeout(() => {
      const section =
        document.getElementById("contact")

      if (section) {
        section.scrollIntoView({
          behavior: "smooth"
        })
      }
    }, 100)
  }}
  className="text-left hover:text-white py-1"
>
  Contact
</button>


      <button
  onClick={() => {
    setOpen(false)
    if (isAdmin) {
      navigate("/admin")
    } else {
      navigate("/admin-login")
    }
  }}
  className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition text-center"
>
  Admin
</button>

      {/* DIVIDER */}
      <div className="border-t border-white/10 my-2"></div>

      {/* BUTTONS */}
      <div className="flex flex-col gap-3">

        {!isLoggedIn ? (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="w-full border border-gray-600 px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition">
                Login
              </button>
            </Link>

            <Link to="/signup" onClick={() => setOpen(false)}>
              <button className="w-full border border-gray-600 px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition">
                Signup
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              setOpen(false)
              handleLogout()
            }}
            className="w-full border border-gray-600 px-4 py-2 rounded-md text-sm hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        )}

      </div>

    </div>

  </div>
)}

    </nav>
  )
}

export default Navbar