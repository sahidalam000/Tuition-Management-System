import React,
{
useEffect,
useState
}
from "react"
import API from "../api/axios"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const ScienceFeesPreview = () => {

  const navigate = useNavigate()

  const [fees,
setFees]

=

useState([])

useEffect(()=>{

fetchFees()

},[])


const fetchFees=
async()=>{

try{

const res=
await API.get(
"/fees/all"
)

setFees(
res.data
)

}catch(err){

console.log(err)

}

}

  const classes = ["8", "9", "10"]

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-14">

      {/* HEADER */}
      <div className="text-center mb-14">


        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="relative inline-block"
>

  <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
    Choose Your Science Class
  </h1>

  {/* GLOW */}
  <div className="absolute inset-0 blur-3xl bg-blue-500/10"></div>

  {/* UNDERLINE */}
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: "100%" }}
    transition={{ duration: 1 }}
    className="h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-2"
  />

</motion.div>

<br /> 
<br />
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore affordable science pricing with combo
         designed for every class.
        </p>

      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {classes.map((cls) => {

          const fee=

fees.find(

f=>

f.course==="science"

&&

String(
f.assignedClass
)

===

String(cls)

)

||

{

regularFee:0,
originalFee:0,
image:""

}

          return (

            <div
              key={cls}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
            >

              {/* IMAGE */}
              <div className="h-56 overflow-hidden">

                <img
                  src={
                    fee.image ||
                    "https://images.unsplash.com/photo-1509062522246-3755977927d7"
                  }
                  alt="science"
                  className="w-full h-full object-cover"
                />

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <p className="text-blue-400 text-sm mb-2">
                  Science Class
                </p>

                <p className="text-xs text-green-400 mb-3">
             🎯 Combo discount available with Mathematics
              </p>

                <h2 className="text-3xl font-bold mb-5">
                  Class {cls}
                </h2>

                {/* PRICE */}
                <div className="flex items-end gap-3 mb-6">

                  <span className="text-gray-500 line-through text-xl">
                    ₹{fee.originalFee}
                  </span>

                  <span className="text-green-400 text-4xl font-bold">
                    ₹{fee.regularFee}

                  <span className="text-lg text-gray-400 font-medium">
                   /month
                    </span>
                  </span>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    navigate(`/science/class/${cls}/fees`)
                  }
                  className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 py-3 rounded-xl font-semibold"
                >
                  View Details
                </button>

              </div>

            </div>

          )
        })}

      </div>

    </div>
  )
}

export default ScienceFeesPreview