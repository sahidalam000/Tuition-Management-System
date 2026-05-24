import {

useEffect,
useState

}

from "react"
import API from "../../api/axios"
import BackButton from "../../components/BackButton"
import { useNavigate } from "react-router-dom"

const Fees = () => {

    const navigate = useNavigate()

    const [feeData,setFeeData]
=
useState(null)

  // 📦 Fees Database
  

  // 📍 Current URL Class
  const path = window.location.pathname
  const classNumber = path.split("/")[3]

 useEffect(()=>{

fetchFee()

},[classNumber])


const fetchFee =
async()=>{

try{

const res =
await API.get(
"/fees/all"
)

const fee =

res.data.find(

f=>

f.course==="math"

&&

String(
f.assignedClass
)

===

String(
classNumber
)

)

setFeeData(
fee
)

}catch(err){

console.log(err)

}

}

const user =
JSON.parse(
localStorage.getItem("user")
)

const userName =
user?.name?.toLowerCase()


const [students,
setStudents]

=
useState([])


useEffect(()=>{

fetchStudents()

},[])


const fetchStudents=
async()=>{

try{

const token=
localStorage.getItem(
"token"
)

const res=
await API.get(

"/admin/approved-students",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

)

setStudents(
res.data
)

}catch(err){

console.log(err)

}

}



const mathStudents=

students.filter(

s=>

s.course==="math"

)



const isMathStudent =

mathStudents.some(

s=>

s.name?.toLowerCase()

===

userName

&&

String(
s.assignedClass
)

===

String(
classNumber
)

)


  // 📘 Subject Fees
  

  // 💰 Discount
  const saved =

feeData

?

feeData.originalFee
-
feeData.regularFee

:

0

if(!feeData){

return(

<div
className="
min-h-screen
bg-[#020617]
flex
items-center
justify-center
text-white
"
>

Loading fees...

</div>

)

}

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">

       <BackButton

to={

isMathStudent

?

"/math"

:

"/courses"

}

/>
      {/* ===================== */}
      {/* HEADER */}
      {/* ===================== */}
      <h1 className="text-3xl font-bold text-center mb-12">
        💰 Mathematics Fees - Class {classNumber}
      </h1>

      {/* ===================== */}
      {/* MAIN CARD */}
      {/* ===================== */}
      <div className="max-w-5xl mx-auto">

        <div className="bg-white/10 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">

          <div className="grid md:grid-cols-2">

            {/* ===================== */}
            {/* LEFT IMAGE */}
            {/* ===================== */}
            <div className="relative h-[300px] md:h-full">

              <img
                src={
                  feeData.image ||
                  "https://images.unsplash.com/photo-1509062522246-3755977927d7"
                }
                alt="fees"
                className="w-full h-full object-cover"
              />

              {/* OFFER BADGE */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                🔥 Limited Offer
              </div>

            </div>

            {/* ===================== */}
            {/* RIGHT CONTENT */}
            {/* ===================== */}
            <div className="p-8 flex flex-col justify-between">

              <div>

                {/* SUBJECT */}
                <p className="text-blue-400 text-sm mb-2 uppercase tracking-widest">
                  Mathematics Class
                </p>

                {/* TITLE */}
                <h2 className="text-4xl font-bold mb-6">
                  Class {classNumber}
                </h2>

                {/* PRICE */}
                <div className="flex flex-wrap items-end gap-3 mb-3">

                  <span className="text-gray-400 line-through text-xl md:text-2xl">
                    ₹{feeData.originalFee}
                  </span>

                  <span className="text-green-400 text-4xl md:text-5xl font-bold break-words">
                    ₹{feeData.regularFee}

                    <span className="text-xl text-gray-400 font-medium">
                    /month
                    </span>
                  </span>

                </div>

                {/* SAVE */}
                <p className="text-yellow-400 mb-6">
                  🎉 Save ₹{saved} every month
                </p>

                {/* FEATURES */}
                <div className="space-y-3">

                  {feeData.features?.map((f, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="text-green-400">
                        ✔
                      </span>

                      <span className="text-gray-300">
                        {f}
                      </span>
                    </div>

                  ))}

                </div>

              </div>

              {/* ===================== */}
              {/* FOOTER */}
              {/* ===================== */}
              <div className="mt-10 border-t border-white/10 pt-6">

                <div className="grid md:grid-cols-2 gap-4">

                  {/* PAYMENT */}
                  <div className="bg-black/20 p-4 rounded-xl">

                    <p className="text-sm text-gray-400 mb-1">
                      Payment Method
                    </p>

                    <p className="font-semibold">
                      Offline Fee Payment
                    </p>

                  </div>

                  {/* CONTACT */}
                  <div className="bg-black/20 p-4 rounded-xl">

                    <p className="text-sm text-gray-400 mb-1">
                      Contact
                    </p>

                    <p className="font-semibold">
                      +91 9101504697
                    </p>

                  </div>

                </div>

                {/* CTA */}
                <button
  onClick={() => {

    const isLoggedIn =
      localStorage.getItem("isLoggedIn")

    if (isLoggedIn) {

      navigate("/courses")

    } else {

      // 🔥 after signup redirect
      localStorage.setItem(
        "redirectAfterLogin",
        "/courses"
      )

      navigate("/signup")
    }
  }}
  className="w-full mt-6 bg-green-500 hover:bg-green-600 transition-all duration-300 py-3 rounded-xl font-semibold text-lg"
>
  Join this Class
</button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Fees