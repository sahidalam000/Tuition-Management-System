import React,
{
useEffect,
useState
}
from "react"

import API
from "../../api/axios"

import BackButton from "../../components/BackButton"
import { useParams } from "react-router-dom"

const Performance = () => {

  const { id } = useParams()
  const [students,
setStudents]
=
useState([])

  const classNumber = id


useEffect(()=>{

fetchStudents()

},[])


const fetchStudents=
async()=>{

try{

const token=
localStorage
.getItem(
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



const classStudents=

students.filter(

s=>

String(
s.assignedClass
)

===

String(
classNumber
)

&&

s.course==="math"

)


  if (classStudents.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        No Students Found
      </div>
    )
  }

  // 🔥 TOTAL
  const getTotalMarks = (student) => {
    if (!student.marks) return 0
    return student.marks.reduce((sum, t) => sum + (t.marks || 0), 0)
  }

  // 🔥 SORT
  const sortedStudents = [...classStudents].sort(
    (a, b) => getTotalMarks(b) - getTotalMarks(a)
  )

  const topper = sortedStudents[0]

  // 🔥 TEST LIST
  const allTests = Array.from(
    new Set(
      classStudents.flatMap((s) =>
        s.marks?.map((m) => m.test) || []
      )
    )
  )

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">

        <BackButton 
          to="/math"
        />
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-12 tracking-wide">
        🏆 Performance - Class {classNumber}
      </h1>

      {/* 🏆 TOPPER CARD */}
      {topper && (
        <div className="max-w-xl mx-auto mb-12">

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-300/5 border border-yellow-400/30 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl">

            <p className="text-yellow-400 text-sm mb-2 tracking-widest">
              TOPPER
            </p>

            <h2 className="text-lg mb-6 text-gray-300">
              🏆 Rank 1 Student
            </h2>

            {/* 🔥 BIG SQUARE IMAGE */}
            <div className="flex justify-center mb-6">
              <img
                src={
                  topper.profileImage ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${topper.name}`
                }
                alt="topper"
                className="w-32 h-32 object-cover rounded-xl border-2 border-yellow-400 shadow-lg"
              />
            </div>

            <h3 className="text-xl font-semibold">
              {topper.name}
            </h3>

          </div>
        </div>
      )}

      {/* 📊 RANK LIST */}
      <div className="max-w-3xl mx-auto mb-12">

        <h2 className="text-xl mb-5 text-gray-300">
          📊 Rankings
        </h2>

        <div className="space-y-3">

          {sortedStudents.slice(1).map((student, index) => (

            <div
              key={student._id}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-white/10 transition"
            >

              <div className="flex items-center gap-4">

                <span className="text-yellow-400 font-bold text-lg">
                  #{index + 2}
                </span>

                <img
                  src={
                    student.profileImage ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`
                  }
                  alt="student"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <p className="font-medium">{student.name}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* 📈 MARKS TABLE */}
      <div className="max-w-5xl mx-auto">

        <h2 className="text-xl mb-5 text-gray-300">
          📈 Marks Overview
        </h2>

        {allTests.length === 0 ? (
          <p className="text-center text-gray-400">
            No tests added yet
          </p>
        ) : (

          <div className="overflow-x-auto rounded-xl border border-white/10">

            <table className="w-full border border-white/20 border-separate border-spacing-x-3">

              <thead className="bg-white/10">
                <tr>
                  <th className="p-3 text-left">Student</th>

                  {allTests.map((test) => (
                    <th key={test} className="p-3 text-center">
                      {test}
                    </th>
                  ))}

                  <th className="p-3 text-center text-yellow-400">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>

                {sortedStudents.map((student) => (

                  <tr
                    key={student._id}
                    className="border-t border-white/10 hover:bg-white/5"
                  >

                    <td className="p-3">{student.name}</td>

                    {allTests.map((test) => {
  const found = student.marks?.find(
    (m) => m.test === test
  )

  return (
    <td key={test} className="p-2 px-4">

      {found ? (
        <div className="flex flex-col items-center gap-1">

          {/* MARKS */}
          <span className="font-semibold">
     {found.marks} / {found.outOf || "-"}
     </span>

          {/* CHAPTERS */}
          {found.chapters && (
            <span className="text-xs text-gray-400 mt-1">
              {found.chapters.join(", ")}
            </span>
          )}

        </div>
      ) : "-"}

    </td>
  )
})}

                    <td className="p-3 text-center font-bold text-yellow-400">
                      {getTotalMarks(student)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  )
}

export default Performance