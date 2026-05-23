import API from "../api/axios"
import React, { useState } from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Signup = () => {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

 const handleSubmit = async (e) => {
  e.preventDefault()

  try {

    const response = await API.post(
      "/auth/register",
      {
        name: form.name,
        email: form.email,
        password: form.password,
      }
    )

    // SAVE TOKEN
    localStorage.setItem(
      "token",
      response.data.token
    )

    // SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    )

    localStorage.setItem("isLoggedIn", "true")

    window.dispatchEvent(
  new Event("storage")
)

    toast.success("Signup Successful")

    setUser(response.data.user);

    // REDIRECT
    const redirectPath =
      localStorage.getItem("redirectAfterLogin")

    if (redirectPath === "/courses") {
      navigate("/courses")
    } else {
      navigate("/")
    }

    localStorage.removeItem("redirectAfterLogin")

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Signup Failed"
    )
  }
}

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4">

      <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-lg w-full max-w-md text-white">

        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-md bg-transparent border border-gray-400"
          />

           <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-md bg-transparent border border-gray-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-md bg-transparent border border-gray-400"
          />

          <button
            type="submit"
            className="bg-white text-black py-2 rounded-md font-medium hover:bg-gray-200 transition mt-2"
          >
            Sign Up
          </button>

        </form>

        <p className="text-sm text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-white underline cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  )
}

export default Signup