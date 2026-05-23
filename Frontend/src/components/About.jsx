import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaBookOpen } from 'react-icons/fa'

import whoImg from '../assets/who.avif'
import section4Img from '../assets/section4.avif'
import mathsImg from '../assets/maths.avif'
import scienceImg from '../assets/science.avif'
import sahidbhaiImg from '../assets/sahidbhai.avif'

const About = () => {

  const [headingText, setHeadingText] = useState('')
  const fullText = "About Us"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setHeadingText(fullText.substring(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(interval)
    }, 70)
    return () => clearInterval(interval)
  }, [])

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0 }
  }

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <div id="about" className="w-full bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#020617] text-white px-6 md:px-16 py-20">

      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-center mb-16"
      >
        {headingText}
      </motion.h2>

<br />
      {/* 🔹 WHO WE ARE */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-20">

        <motion.img src={whoImg} className="w-full md:w-[480px] h-[280px] object-cover rounded-xl" variants={fadeLeft} initial="hidden" whileInView="show" />

        <motion.div className="md:w-1/2" variants={fadeRight} initial="hidden" whileInView="show">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">  <em>Who We Are</em> </h3>
          <br />

          {/* <div className="border-l-2 border-white/20 pl-4 space-y-3 text-gray-300 text-base md:text-lg">
            <p>• Bright Future Tutoring is a simple and friendly learning place for students.</p>
            <p>• We teach students from Class 6 to Class 10.</p>
            <p>• Our main focus is to make concepts clear and easy.</p>
            <p>• We help students enjoy learning and build confidence.</p>
          </div> */}

          <div className="space-y-5 text-gray-300 text-base md:text-lg">

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Bright Future Tutoring is a simple and friendly learning place for students.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>We teach students from Class 8 to Class 10.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Our main focus is to make concepts clear and easy.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>We help students enjoy learning and build confidence.</p>
  </div>

</div>
        </motion.div>

      </div>

      {/* 🔹 WHY BRIGHT FUTURE */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-20">

        <motion.img src={section4Img} className="w-full md:w-[480px] h-[280px] object-cover rounded-xl" variants={fadeRight} initial="hidden" whileInView="show" />

        <motion.div className="md:w-1/2" variants={fadeLeft} initial="hidden" whileInView="show">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">  <em>Why Bright Future Tutoring</em> </h3>
          <br />

          {/* <div className="border-l-2 border-white/20 pl-4 space-y-3 text-gray-300 text-base md:text-lg">
            <p>• Every student gets personal attention.</p>
            <p>• Topics are explained in very simple language.</p>
            <p>• Students can ask doubts freely without fear.</p>
            <p>• Regular practice helps students improve step by step.</p>
          </div> */}

          <div className="space-y-5 text-gray-300 text-base md:text-lg">

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Every student gets personal attention.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Topics are explained in very simple language.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Students can ask doubts freely without fear.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Regular practice helps students improve step by step.</p>
  </div>

</div>
        </motion.div>

      </div>
      <br />

      {/* 🔹 WHAT WE TEACH */}
      {/* 🔹 WHAT WE TEACH */}
<div className="mb-20">

  {/* HEADING CENTER */}
  <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">
                <em>What We Teach</em>
  </h3>
<br />
  {/* MATHS */}
  <div className="flex flex-col md:flex-row items-center gap-10 mb-16">

    <motion.img
      src={mathsImg}
      className="w-full md:w-[480px] h-[280px] object-cover rounded-xl"
      variants={fadeLeft}
      initial="hidden"
      whileInView="show"
    />

    <motion.div
      className="md:w-1/2"
      variants={fadeRight}
      initial="hidden"
      whileInView="show"
    >
      <h4 className="text-xl font-semibold mb-3">Mathematics</h4>
<br />
      {/* <div className="border-l-2 border-white/20 pl-4 space-y-2 text-gray-300 text-base md:text-lg">
        <p>• Easy methods to understand basic concepts.</p>
        <p>• Step-by-step problem solving.</p>
        <p>• Focus on accuracy and speed.</p>
        <p>• Helps in exam preparation.</p>
      </div> */}
      <div className="space-y-5 text-gray-300 text-base md:text-lg">

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Easy methods to understand basic concepts.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Step-by-step problem solving.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Focus on accuracy and speed.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Helps in exam preparation.</p>
  </div>

</div>
    </motion.div>

  </div>

  {/* SCIENCE */}
  <div className="flex flex-col md:flex-row-reverse items-center gap-10">

    <motion.img
      src={scienceImg}
      className="w-full md:w-[480px] h-[280px] object-cover rounded-xl"
      variants={fadeRight}
      initial="hidden"
      whileInView="show"
    />

    <motion.div
      className="md:w-1/2"
      variants={fadeLeft}
      initial="hidden"
      whileInView="show"
    >
      <h4 className="text-xl font-semibold mb-3">Science</h4>
      <br />

      {/* <div className="border-l-2 border-white/20 pl-4 space-y-2 text-gray-300 text-base md:text-lg">
        <p>• Physics, Chemistry and Biology explained simply</p>
        <p>• Real-life examples for better understanding</p>
        <p>• Clear concepts without confusion</p>
        <p>• Strong support for school exams</p>
      </div> */}
      <div className="space-y-5 text-gray-300 text-base md:text-lg">

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Physics, Chemistry and Biology explained simply.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Real-life examples for better understanding.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Clear concepts without confusion.</p>
  </div>

  <div className="flex items-start gap-3">
    <FaBookOpen className="text-white/70 text-sm mt-1" />
    <p>Strong support for school exams.</p>
  </div>

</div>
    </motion.div>

  </div>

</div>

      {/* 🔹 TEACHER SECTION */}

{/* 🔥 HEADING OUTSIDE */}
<h3 className="text-2xl md:text-3xl font-semibold text-center mt-20 mb-10">
       <em>About the Tutor</em>
</h3>
<br />
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  className="flex justify-center"
>

  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-10 max-w-5xl w-full flex flex-col md:flex-row items-center gap-10">

    {/* IMAGE */}
    <img
      src={sahidbhaiImg}
      className="w-40 h-40 md:w-64 md:h-64 rounded-xl object-cover border-4 border-white/20"
    />

    {/* CONTENT */}
    <div className="text-center md:text-left max-w-xl">

      {/* <h4 className="text-2xl font-semibold mb-2">
        Sahid Alam
      </h4> */}

      {/* 🔥 PREMIUM BADGE WITH ICON */}
      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm text-gray-200 mb-5">
        <span>💻</span>
        <span>Software Engineer</span>
      </div>

      {/* DESCRIPTION */}
      <div className="border-l-2 border-white/20 pl-4 space-y-3 text-gray-300 text-base md:text-lg leading-relaxed">

  <p><span className="font-semibold text-white">Name:</span> Sahid Alam</p>

  <p><span className="font-semibold text-white">Address:</span> North Lakhimpur, Assam - 787031</p>

  <p><span className="font-semibold text-white">Qualification:</span> B.Tech in Computer Science & Engineering from Assam Downtown University</p>

  <p><span className="font-semibold text-white">Role:</span> Software/ IT Engineer & manage Bright Future Tutoring also teach students</p>

</div>

    </div>

  </div>

</motion.div>

    </div>
  )
}

export default About