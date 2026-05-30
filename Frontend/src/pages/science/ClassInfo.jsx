import React,
{
useState,
useEffect
}
from "react"
import BackButton from "../../components/BackButton"
import API
from "../../api/axios"


const ClassInfo = () => {


  const [students,
setStudents]
=
useState([])


useEffect(()=>{

fetchStudents()

},[])



const fetchStudents =
async()=>{

try{

const token =
localStorage.getItem(
"token"
)

const res =
await API.get(

"/enrollment/approved-students/science",

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

  // 📍 GET CLASS FROM URL  (/math/class/8/info)
  const path = window.location.pathname
  const classNumber = path.split("/")[3]

  // ✅ FILTER BY CLASS
  const classStudents =
students.filter(

(s)=>

String(
s.assignedClass
)

===

String(
classNumber
)

)

  // ❌ NO DATA
  if (classStudents.length === 0) {
    return (
      <div className="text-white text-center mt-10">
        No Students Found in Class {classNumber}
      </div>
    )
  }

  const today = new Date()

  // =============================
  // 🔥 HELPER FUNCTIONS
  // =============================

  const getNextDue = (student) => {
    if (!student.joinDate) return null

    let next = new Date(student.joinDate)

    while (next <= today) {
      next.setMonth(next.getMonth() + 1)
    }

    return next
  }

  const getLastDue = (student) => {
    if (!student.joinDate) return null

    let last = new Date(student.joinDate)

    while (true) {
      const next = new Date(last)
      next.setMonth(next.getMonth() + 1)

      if (next > today) break
      last = next
    }

    return last
  }

  const getStatus = (student) => {
  if (!student.joinDate) return { text: "No data", overdue: 0 }

  const today = new Date()
  const join = new Date(student.joinDate)

  // 👉 FIRST DUE (1 month after joining)
  const firstDue = new Date(join)
  firstDue.setMonth(firstDue.getMonth() + 1)

  // 🔴 NEVER PAID CASE
  if (!student.paidTill) {
    if (today > firstDue) {
      const overdueDays = Math.floor(
        (today - firstDue) / (1000 * 60 * 60 * 24)
      )

      return {
        text: `Overdue (${overdueDays} days)`,
        overdue: overdueDays
      }
    }

    return {
      text: "On Time",
      overdue: 0
    }
  }

  // ✅ PAID CASE
  const paid = new Date(student.paidTill)

  const nextDue = new Date(paid)
  nextDue.setMonth(nextDue.getMonth() + 1)

  if (today > nextDue) {
    const overdueDays = Math.floor(
      (today - nextDue) / (1000 * 60 * 60 * 24)
    )

    return {
      text: `Overdue (${overdueDays} days)`,
      overdue: overdueDays
    }
  }

  const daysLeft = Math.ceil(
    (nextDue - today) / (1000 * 60 * 60 * 24)
  )

  if (daysLeft <= 5) {
    return {
      text: `Due in ${daysLeft} days`,
      overdue: 0
    }
  }

  return {
    text: "On Time",
    overdue: 0
  }
}

  // =============================
  // 🔥 TOP CARDS SUMMARY
  // =============================

 const getEffectiveNextDue = (student) => {

  if (!student.joinDate) return null

  const today = new Date()

  let next = new Date(student.joinDate)

  while (next <= today) {
    next.setMonth(next.getMonth() + 1)
  }

  return next
}

const allNextDues = classStudents
  .map(getEffectiveNextDue)
  .filter(Boolean)

const nearestDue =
  allNextDues.length > 0
    ? new Date(Math.min(...allNextDues))
    : null


  const totalOverdueStudents = classStudents.reduce((acc, s) => {
  const status = getStatus(s)
  return status.overdue > 0 ? acc + 1 : acc
}, 0)



  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">
     <BackButton to="/science" />
      <h1 className="text-3xl font-bold text-center mb-10">
        📊 Class Info - Class {classNumber} 
      </h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white/10 p-5 rounded-xl text-center">
          <p className="text-gray-400">Students</p>
          <h2 className="text-xl font-bold">{classStudents.length}</h2>
        </div>

        <div className="bg-white/10 p-5 rounded-xl text-center">
  <p className="text-gray-400">Class</p>
  <h2 className="text-yellow-400 font-bold">
    Class {classNumber}
  </h2>
</div>

        <div className="bg-white/10 p-5 rounded-xl text-center">
          <p className="text-gray-400">Total Overdue</p>
          <h2 className="text-red-500 font-bold">
            {totalOverdueStudents} students
          </h2>
        </div>

        <div className="bg-white/10 p-5 rounded-xl text-center">
          <p className="text-gray-400">Class Status</p>
          <h2 className="font-bold">
            Active
          </h2>
        </div>

      </div>

      {/* STUDENT CARD */}
      {/* 🔥 STUDENT CARDS */}
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">

        {classStudents.map((student) => {

          const joinDate = student.joinDate
            ? new Date(student.joinDate)
            : null

          const lastPaid = student.lastPaidDate
            ? new Date(student.lastPaidDate)
            : null

          const nextDue = getEffectiveNextDue(student)
          const status = getStatus(student)

          return (

            <div
              key={student._id}
              className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-white/20 p-6 rounded-xl"
            >

              <div className="flex items-center gap-4 mb-6">

                <img
                  src={
                    student.profileImage ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`
                  }
                  className="w-16 h-16 rounded-full border-2 border-yellow-400"
                />

                <div>
                  <h2 className="text-xl font-semibold">
                    {student.name}
                  </h2>
                  <p className="text-gray-400">
                    Class {student.assignedClass} Student
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                <p>
                  📅 Joined: {joinDate ? joinDate.toDateString() : "N/A"}
                </p>

                <p>
                  💰 Last Paid:{" "}
                  {lastPaid ? lastPaid.toDateString() : "Not Paid Yet"}
                </p>

                <p>
                  📆 Next Due:{" "}
                  {nextDue ? nextDue.toDateString() : "N/A"}
                </p>

                <p>
                  ⚠️ Status:{" "}
                  {status.text.includes("Overdue") ? (
                    <span className="text-red-400">{status.text}</span>
                  ) : status.text.includes("Due") ? (
                    <span className="text-yellow-400">{status.text}</span>
                  ) : (
                    <span className="text-green-400">{status.text}</span>
                  )}
                </p>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default ClassInfo