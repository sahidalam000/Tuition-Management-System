import React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const NotFound = () => {

  const navigate = useNavigate()

  return (

    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 text-white">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="
          w-full
          max-w-2xl
          bg-white/5
          border border-white/10
          backdrop-blur-md
          rounded-3xl
          p-10
          text-center
          shadow-2xl
        "
      >

        {/* 404 */}
        <h1 className="
          text-7xl
          md:text-9xl
          font-bold
          text-transparent
          bg-clip-text
          bg-gradient-to-r
          from-blue-400
          to-purple-500
          mb-6
        ">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Page Not Found
        </h2>

        {/* DESC */}
        <p className="text-gray-400 max-w-lg mx-auto mb-10">
          The page you are looking for does not exist
          or may have been moved.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <button
            onClick={() => navigate("/")}
            className="
              bg-white
              text-black
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:scale-105
              transition-all
              duration-300
            "
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="
              border
              border-white/20
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:bg-white/10
              transition-all
              duration-300
            "
          >
            Go Back
          </button>

        </div>

      </motion.div>

    </div>
  )
}

export default NotFound