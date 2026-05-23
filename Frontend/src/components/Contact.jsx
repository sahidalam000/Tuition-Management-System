import React,
{
useState
}
from "react"
import API
from "../api/axios"
import toast
from "react-hot-toast"
import { motion } from "framer-motion"
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope
} from "react-icons/fa"




const Contact = () => {

const [name,setName]
=
useState("")

const [studentClass,
setStudentClass]

=
useState("")

const [message,
setMessage]

=
useState("")


const handleSubmit=
async(e)=>{

e.preventDefault()

if(
!name ||
!studentClass ||
!message
){

toast.error(
"Fill all fields"
)

return

}


try{

await API.post(

"/contact/send",

{

name,

studentClass,

message

}

)

toast.success(
"Message Sent"
)

setName("")
setStudentClass("")
setMessage("")

}catch{

toast.error(
"Failed"
)

}

}


  return (

    <section
      id="contact"
      className="bg-[#020617] text-white px-3 md:px-6 py-20 overflow-x-hidden"
    >

      {/* HEADER */}
      <div className="text-center mb-16">

        <p className="text-blue-400 uppercase tracking-[2px] md:tracking-[4px] text-sm mb-3">
          Contact Us
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold mb-5"
        >
          Let’s Connect
        </motion.h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Have questions about enrollments, fees,
          classes or combo packages?
          Reach out anytime.
        </p>

      </div>

      {/* MAIN GRID */}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-10">

        {/* LEFT */}
        <div className="space-y-6 w-full">

          {/* PHONE */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4 w-full">

            <div className="bg-green-500/20 p-4 rounded-xl">
              <FaPhoneAlt className="text-green-400 text-xl" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-1">
                Phone Number
              </h3>

              <a

href="tel:+919101504697"

className="
text-gray-400
hover:text-green-400
transition
"

>

+91 9101504697

</a>
            </div>

          </div>

          {/* WHATSAPP */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4 w-full">

            <div className="bg-green-500/20 p-4 rounded-xl">
              <FaWhatsapp className="text-green-400 text-xl" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-1">
                WhatsApp
              </h3>

              <a

href="
https://wa.me/919101504697?
text=Hello%20Sir,%20I%20need%20enrollment
%20help
"

target="_blank"

rel="noreferrer"

className="
text-gray-400
hover:text-green-400
transition
"

>

Chat for quick support & enrollment help

</a>
            </div>

          </div>

          {/* EMAIL */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4 w-full">

            <div className="bg-blue-500/20 p-4 rounded-xl">
              <FaEnvelope className="text-blue-400 text-xl" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-1">
                Email
              </h3>

             <a

href="
mailto:brightfuture@gmail.com
"

className="
text-gray-400
hover:text-blue-400
transition
"

>

brightfuture@gmail.com

</a>
            </div>

          </div>

          {/* ADDRESS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4 w-full">

            <div className="bg-red-500/20 p-4 rounded-xl">
              <FaMapMarkerAlt className="text-red-400 text-xl" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-1">
                Address
              </h3>

             <a

href="
https://maps.google.com/?q=
Sensowa,
North+Lakhimpur,
Assam
"

target="_blank"

rel="noreferrer"

className="
text-gray-400
hover:text-red-400
transition
"

>

Sensowa, North Lakhimpur,
Assam, 787031

</a>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h3 className="text-2xl font-semibold mb-6">
            Send a Message
          </h3>

          <form 
          onSubmit={handleSubmit}
          className="space-y-5">

            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}

onChange={(e)=>
setName(
e.target.value
)
}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Enter Your Class"
              value={studentClass}

onChange={(e)=>
setStudentClass(
e.target.value
)
}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <textarea
              rows="5"
              placeholder="Write your message..."
              value={message}

onChange={(e)=>
setMessage(
e.target.value
)
}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
            />

            <button
              type="submit"
              className="w-full bg-gray-500 hover:bg-gray-600 transition-all duration-300 py-3 rounded-xl font-semibold text-lg"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>
  )
}

export default Contact