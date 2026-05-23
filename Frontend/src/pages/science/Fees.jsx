import React,
{
useEffect,
useState
}
from "react"
import API from "../../api/axios"
import BackButton from "../../components/BackButton"
import { useNavigate } from "react-router-dom"

const Fees = () => {

    const navigate = useNavigate()

  // 📦 Fees Database
  const [feeData,setFeeData]
=
useState(null)

const [fees,setFees]
=
useState([])

  // 📍 Current URL Class
  const path = window.location.pathname
  const classNumber = path.split("/")[3]

  useEffect(()=>{

fetchFee()

},[classNumber])


const fetchFee=
async()=>{

try{

const res=
await API.get(
"/fees/all"
)

setFees(
res.data
)


const fee=

res.data.find(

f=>

f.course==="science"

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

  // 📘 Subject Fees
 

    const user =
  JSON.parse(localStorage.getItem("user"))

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

 const scienceStudents=

students.filter(

s=>

s.course==="science"

)


 if(!feeData){

return(

<div
className="
min-h-screen
bg-[#020617]
text-white
flex
items-center
justify-center
"
>

Loading fees...

</div>

)

}


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



const isScienceStudent =

scienceStudents.some(

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

// ✅ FINAL COMBO STATUS
const hasComboApplied =
  isMathStudent && isScienceStudent

  const finalFee = hasComboApplied
  ? feeData.regularFee -
    (feeData.comboDiscount || 0)
  : feeData.regularFee

  // 💰 Discount
  const saved =
  feeData.originalFee - finalFee

const mathFee =

Number(

fees.find(

fee =>

fee.course === "math"

&&

String(
fee.assignedClass
)

===

String(
classNumber
)

)?.regularFee

)

|| 0


console.log(
"Class:",
classNumber,
"Math Fee:",
mathFee,
"Fees:",
fees
)

 
  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">
                  <BackButton

to={

isScienceStudent

?

"/science"

:

"/courses"

}

/>
      {/* ===================== */}
      {/* HEADER */}
      {/* ===================== */}
      <h1 className="text-3xl font-bold text-center mb-12">
        💰 Science Fees - Class {classNumber}
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
                  Science Class 
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
                    {/* ₹{feeData.monthlyFee} */}
                    ₹{finalFee}

              <span className="text-xl text-gray-400 font-medium">
                 /month
               </span>
                  </span>

                </div>

                {/* SAVE */}
                <p className="text-yellow-400 mb-6">
                  🎉 Save ₹{saved} every month
                </p>

                {/* 🔥 COMBO INFO */}

{/* ===================== */}
{/* 🎯 COMBO ELIGIBILITY */}
{/* ===================== */}

<div className="mb-6">

  {hasComboApplied ? (

    <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-4">

      <div className="flex items-center gap-2 mb-2">

        <span className="text-green-400 text-lg">
          🔥
        </span>

        <p className="text-green-300 font-semibold">
          Combo Discount Applied
        </p>

      </div>

      <p className="text-sm text-gray-300 leading-relaxed">

        You're enrolled in Mathematics,
        so your Science fee has been
        automatically reduced with combo pricing.

      </p>

    </div>

  ) : (

    <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-4">

      <div className="flex items-center gap-2 mb-2">

        <span className="text-blue-400 text-lg">
          🎯
        </span>

        <p className="text-blue-300 font-semibold">
          Combo Eligibility Offer
        </p>

      </div>

      <p className="text-sm text-gray-300 leading-relaxed">

        {isMathStudent ? (
  <>
    You're enrolled in Mathematics.

    Add Science enrollment now
    to activate your combo discount pricing.
  </>
) : (
  <>
    Enroll in Mathematics for Class {classNumber} <span className="gap-2"></span>
     and unlock Science combo pricing.
  </>
)}

      </p>

      <div className="mt-4 flex items-center justify-between bg-black/20 rounded-xl px-4 py-3">

        <div>
          <p className="text-xs text-gray-400">
            Regular Science Fee
          </p>

          <p className="text-lg font-semibold text-white">
            ₹{feeData.regularFee}
          </p>
        </div>

        <div className="text-2xl text-gray-500">
          →
        </div>

        <div>
          <p className="text-xs text-gray-400">
            Combo Science Fee
          </p>

          <p className="text-lg font-semibold text-green-400">
            ₹{
              feeData.regularFee -
              (feeData.comboDiscount || 0)
            }
          </p>
        </div>

      </div>

    </div>

  )}

</div>


                
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

                  {hasComboApplied && (

  <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4">

    <p className="text-yellow-400 font-semibold mb-3">
      🔥 Combo Offer Package
    </p>

    <div className="space-y-2 text-sm text-gray-300">

      <div className="flex justify-between">
        <span>Mathematics</span>
        <span>₹{mathFee}/month</span>
      </div>

      <div className="flex justify-between">
        <span>Science</span>
        <span>₹{finalFee}/month</span>
      </div>

      <div className="border-t border-white/10 pt-2 flex justify-between font-semibold text-white">
        <span>Total</span>
        <span>

₹{

Number(mathFee)

+

Number(finalFee)

}/month

</span>
      </div>

    </div>

  </div>

)}

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