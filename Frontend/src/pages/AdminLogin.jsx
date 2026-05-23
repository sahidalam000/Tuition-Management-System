import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

const AdminLogin = () => {

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // CHECK ADMIN ROLE
      if (response.data.user.role !== "admin") {

        toast.error("Access denied");

        return;
      }

      // SAVE TOKEN
     localStorage.setItem(
  "adminToken",
  response.data.token
);

localStorage.setItem(
  "adminUser",
  JSON.stringify(response.data.user)
);

localStorage.setItem(
  "isAdmin",
  "true"
);

// 🔥 LOGIN STATE
localStorage.setItem(
  "isLoggedIn",
  "true"
);

// 🔥 REFRESH AUTH STATE
window.dispatchEvent(
  new Event("storage")
);

// UPDATE CONTEXT
setUser(response.data.user);

      toast.success("Admin Login Successful");

      navigate("/admin");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };


  return (

    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4">

      <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-lg w-full max-w-md text-white">

        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Admin Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-md bg-transparent border border-gray-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-md bg-transparent border border-gray-400"
          />

          <button
            type="submit"
            className="bg-white text-black py-2 rounded-md font-medium hover:bg-gray-200 transition mt-2"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;