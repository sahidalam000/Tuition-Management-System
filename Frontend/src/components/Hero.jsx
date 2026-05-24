import React, { useState, useEffect } from 'react'
import heroImg from '../assets/hero.avif'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  // ✅ HEADING TYPEWRITER (ONE TIME)
  const [headingText, setHeadingText] = useState('')
  const fullText = "Welcome to Bright Future Tutoring"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setHeadingText(fullText.substring(0, i + 1))
      i++

      if (i === fullText.length) {
        clearInterval(interval)
      }
    }, 80) // slow speed

    return () => clearInterval(interval)
  }, [])

  // ✅ SUBJECT TYPING LOOP
  const words = ["Learn Mathematics", "Learn Science"]
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[index]
    let speed = isDeleting ? 50 : 100

    const timer = setTimeout(() => {
      setText(prev =>
        isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      )

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % words.length)
      }

    }, speed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, index])

  return (
    <div className="w-full h-[90vh] relative">

      {/* BACKGROUND IMAGE */}
      <img
        src={heroImg}
        alt="hero"
        className="w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#0B1220]/80"></div>

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20 md:pt-0">

        {/* TAG */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 text-white px-5 py-1.5 rounded-full text-sm md:text-base mb-6 mt-[-20px]"
        >
          Learn the right way
        </motion.p>

        {/* ✅ HEADING (ONE TIME TYPING) */}
        <h1 className="text-4xl
sm:text-5xl
md:text-6xl
font-bold
text-white
mb-5
leading-tight
max-w-[320px]
sm:max-w-[700px]
mx-auto">
          {headingText}
        </h1>

        {/* ✅ SUBJECT TYPEWRITER */}
        <h2 className="text-2xl md:text-3xl text-gray-200 h-10">
          {text}
          <span className="border-r-2 border-white ml-1 animate-pulse"></span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 text-gray-300 max-w-3xl text-base md:text-lg leading-relaxed">
          Confused about which subject to focus on? We’ve got you covered!
          Learn Mathematics and Science in a simple and effective way with expert guidance.
        </p>


        {/* BUTTONS */}
        <div className="flex gap-4 mt-10">
          <button
  onClick={() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (isLoggedIn) {
      navigate("/courses")
    } else {
      localStorage.setItem("redirectAfterLogin", "/courses") // 🔥 IMPORTANT
      navigate("/signup")
    }
  }}
  className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition"
>
  Explore Courses
</button>

          <button

onClick={() => {

const section =
document.getElementById(
"contact"
)

section?.scrollIntoView({

behavior:"smooth"

})

}}

className="
border border-gray-400
px-7 py-3
rounded-md
text-base
font-medium
text-white
hover:bg-white
hover:text-black
transition
"

>

Contact Us

</button>
        </div>
        <br />

      </div>
    </div>
  )
}

export default Hero