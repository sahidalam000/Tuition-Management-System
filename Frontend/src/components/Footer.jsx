import React from "react"
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa"

const Footer = () => {

  return (

    <footer className="bg-[#010817] text-white border-t border-white/10">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>

          <h2 className="text-3xl font-bold mb-4">
            BrightFuture
          </h2>

          <p className="text-gray-400 leading-7">
            Learn Mathematics & Science with
            modern teaching methods, expert
            guidance and affordable combo pricing.
          </p>

        </div>

        {/* QUICK LINKS */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">

            <a href="/" className="hover:text-white transition">
              Home
            </a>

            <a href="/courses" className="hover:text-white transition">
              Courses
            </a>

            <a href="/fees" className="hover:text-white transition">
              Fees
            </a>

            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>

          </div>

        </div>

        {/* CONTACT */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-green-400" />
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

            <div className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-blue-400" />
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

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-red-400" />
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

        {/* SOCIAL */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <a
              href="/"
              className="bg-white/5 hover:bg-white/10 transition p-4 rounded-xl"
            >
              <FaFacebookF />
            </a>

            <a
              href="/"
              className="bg-white/5 hover:bg-white/10 transition p-4 rounded-xl"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/919101504697?
text=Hello%20Sir,%20I%20need%20enrollment%20help"
              className="bg-white/5 hover:bg-white/10 transition p-4 rounded-xl"
            >
              <FaWhatsapp />
            </a>

            <a
              href="/"
              className="bg-white/5 hover:bg-white/10 transition p-4 rounded-xl"
            >
              <FaYoutube />
            </a>

          </div>

        </div>

      </div>

      {/* DIVIDER */}
      <div className="w-full h-px bg-white/10"></div>

      {/* BOTTOM */}
      <div className="px-6 py-5 text-center text-gray-500 text-sm">

        <div className="
flex
flex-col
md:flex-row
justify-center
gap-4
text-sm
">

<p>

© 2026 BrightFuture Tutoring   

</p>

<a
href="/privacy-policy"
className="
hover:text-white
"
>

  Privacy Policy

</a>

</div>

      </div>

    </footer>

  )
}

export default Footer