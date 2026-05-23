import React from "react"
import { useLocation } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"

const WhatsappButton = () => {

    const location =
useLocation()

const isHome =

location.pathname === "/"

return (

<div
className="
fixed
bottom-6
right-6
z-[999]
flex
flex-col
items-end
gap-3
"
>

{/* HELP BUBBLE */}

{

isHome && (

<div
className="
bg-white
text-black
px-4
py-2
rounded-2xl
shadow-lg
text-sm
max-w-[220px]
animate-bounce
"
>

<p className="font-semibold">
Need Help?
</p>

<p className="text-gray-600">
Chat on WhatsApp
</p>

</div>

)

}


{/* WHATSAPP BUTTON */}

<a

href="
https://wa.me/919101504697?
text=Hello%20Sir,%20I%20want%20information%20about%20enrollment
"

target="_blank"

rel="noreferrer"

className="
bg-green-500
hover:bg-green-600
p-4
rounded-full
shadow-xl
hover:scale-110
transition-all
duration-300
"

>

<FaWhatsapp

className="
text-white
text-3xl
"

/>

</a>

</div>

)

}

export default WhatsappButton