import React from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

const BackButton = ({ to, state }) => {

  const navigate = useNavigate()

  return (

    <button
      onClick={() => navigate(to, { state })}
      className="
        flex items-center gap-2
        
        hover:bg-white/10
    
        text-white
        px-5 py-2.5
        rounded-xl
        transition-all duration-300
        backdrop-blur-md
        shadow-lg
        mb-8
      "
    >

      <FaArrowLeft className="text-sm" />

      <span className="text-sm md:text-base font-medium">
        
      </span>

    </button>

  )
}

export default BackButton