import React, { useState, useEffect } from 'react'
import BackButton from "../../components/BackButton"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import API from "../../api/axios"

const Science = () => {

  const navigate = useNavigate()


  const [error, setError] = useState("")

  const [codeModal, setCodeModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [enteredCode, setEnteredCode] = useState("")

  const [mobileMenu, setMobileMenu] = useState(false)
  const [students,setStudents] =
  useState([])

  const [openClass, setOpenClass] = useState(
  localStorage.getItem("scienceOpenClass") || null

  )
  const [unlockedClasses, setUnlockedClasses] = useState({})

  const classCodes = {
    8: "BF8",
    9: "BF9",
    10: "BF10"
  }

  const handleClassClick = (cls) => {

  if (unlockedClasses[cls]) {

    const newClass =
      openClass === cls ? null : cls

    setOpenClass(newClass)

    localStorage.setItem(
      "scienceOpenClass",
      newClass
    )

    return
  }

    setSelectedClass(cls)
    setCodeModal(true)
  }

  const fetchStudents =
async()=>{

try{

const token =
localStorage.getItem(
"token"
)

const response =
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
response.data
)

}catch(err){

console.log(err)

}

}

  // ✅ NEW: GET FROM STUDENTS DB
  
  // ✅ WELCOME NAME (FIRST STUDENT OR DEFAULT)

const user = JSON.parse(localStorage.getItem("user"))
const userName = user?.name?.toLowerCase()

const currentStudent = students.find(
  (s) => s.name?.toLowerCase() === userName
)

const assignedClass =
Number(

currentStudent?.assignedClass

)
  // 🔥 IMPORTANT
  // 🔥 LOAD UNLOCKED CLASSES (ADD THIS)

  // 🔥 AUTO UNLOCK STUDENT CLASS
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("unlockedClasses")) || {}

  // 🔥 AUTO UNLOCK STUDENT CLASS
  if (assignedClass) {
    saved[assignedClass] = true
  }


  setUnlockedClasses(saved)

  localStorage.setItem("unlockedClasses", JSON.stringify(saved))
}, [assignedClass])

// FETCH SCIENCE STUDENTS
useEffect(()=>{

fetchStudents()

},[])
  

// 🔥 VERIFY CODE (REPLACE THIS FUNCTION)
const handleVerifyCode = () => {
  if (enteredCode === classCodes[selectedClass]) {

    const updated = {
      ...unlockedClasses,
      [selectedClass]: true
    }

    setUnlockedClasses(updated)

    // ✅ SAVE CORRECT VARIABLE
    localStorage.setItem("unlockedClasses", JSON.stringify(updated))

    setOpenClass(selectedClass)
    setCodeModal(false)
    setEnteredCode("")
    setError("")

    toast.success("Access Granted ✅")

  } else {
    setError("Wrong code ❌")
    toast.error("Invalid Code")
  }
}


  


  const studentName = currentStudent?.name || "Student"

  const fullText = "Welcome to Science Dashboard,"
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let timeout

    if (index < fullText.length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index])
        setIndex(index + 1)
      }, 50)
    } else {
      timeout = setTimeout(() => {
        setText("")
        setIndex(0)
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [index])

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row overflow-x-hidden">
         
   <div className=" flex items-center justify-between mb-6 px-4">

  <BackButton to="/courses" />

  <button
    onClick={() => {

      setMobileMenu(true)

      localStorage.setItem(
        "scienceMobileMenu",
        "true"
      )

    }}
  
    className="md:hidden text-2xl text-white"
  >
    ☰
  </button>
  </div>


      {/* 🔥 MOBILE HEADER */}
      {/* <div className="md:hidden flex items-center justify-between bg-[#0B1220] px-4 py-3 border-b border-white/10">
        <h1 className="font-semibold">BrightFuture</h1>
        <button onClick={() => setMobileMenu(true)}>☰</button>
      </div> */}

      {/* 🔵 SIDEBAR (DESKTOP ONLY) */}
      <div className="hidden md:flex w-[220px] bg-[#0B1220] border-r border-white/10 p-5 flex-col justify-between">

        <div className="flex md:flex-col gap-4">

          <h2 className="text-lg font-semibold">
            Dashboard
          </h2>

          <button className="text-left hover:text-white text-gray-400 transition">
            Dashboard
          </button>

          <br />

          <div className="flex flex-col gap-2">

            <span className="text-gray-400 text-sm mb-1">
              All Classes
            </span>

            {[8, 9, 10].map((cls) => (

              <div key={cls}>

                <button
                  onClick={() => handleClassClick(cls)}
                  className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white"
                >
                  <span>Class {cls}</span>
                  <span>▶</span>
                </button>

                {openClass === cls && (

                  <div className="ml-4 mt-3 flex flex-col gap-2 text-sm">

                    <button
                      onClick={() => navigate(`/science/class/${cls}/info`)}
                      className="flex items-center gap-2 text-left text-gray-300 hover:text-white transition"
                    >
                      📊 <span>Class Info</span>
                    </button>

                    <button
                      onClick={() => navigate(`/science/class/${cls}/performance`)}
                      className="flex items-center gap-2 text-left text-gray-300 hover:text-white transition"
                    >
                      🏆 <span>Performance</span>
                    </button>

                    <button
                      onClick={() => navigate(`/science/class/${cls}/material`)}
                      className="flex items-center gap-2 text-left text-gray-300 hover:text-white transition"
                    >
                      📄 <span>Study Material</span>
                    </button>

                    <button
                      onClick={() => navigate(`/science/class/${cls}/schedule`)}
                      className="flex items-center gap-2 text-left text-gray-300 hover:text-white transition"
                    >
                      📅 <span>Schedule</span>
                    </button>

                    <button
                      onClick={() => navigate(`/science/class/${cls}/fees`)}
                      className="flex items-center gap-2 text-left text-gray-300 hover:text-white transition"
                    >
                      💰 <span>Fees</span>
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("user")
             localStorage.removeItem("isAdmin")
            localStorage.removeItem("unlockedClasses")
            navigate("/")
            window.location.reload()
          }}
          className="text-red-400 hover:text-red-500"
        >
          Logout
        </button>

      </div>

      {/* 🔥 MOBILE SIDEBAR */}
      {mobileMenu && window.innerWidth < 768 && (
        <div className="fixed inset-0 z-50 flex">

          <div className="flex-1 bg-black/60" onClick={() => setMobileMenu(false)}></div>

          <div className="w-[260px] bg-[#0B1220] p-5 flex flex-col justify-between animate-slideIn">

            <div className="flex flex-col gap-4">

              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setMobileMenu(false)}>✕</button>
              </div>

              <button className="text-left text-gray-300 hover:text-white">
                Dashboard
              </button>

              {[8, 9, 10].map((cls) => (

                <div key={cls}>

                  <button
                    onClick={() => handleClassClick(cls)}
                    className="text-left text-gray-300 hover:text-white flex justify-between w-full"
                  >
                    Class {cls} <span>▶</span>
                  </button>

                  {openClass === cls && (

                    <div className="ml-3 mt-2 flex flex-col gap-2 text-sm">

                      <button
                        onClick={() => {
                          setMobileMenu(false)
                          navigate(`/science/class/${cls}/info`)
                        }}
                        className="text-left text-gray-300 hover:text-white"
                      >
                        📊 <span>Class Info</span>
                      </button>

                      <button
                        onClick={() => {
                          setMobileMenu(false)
                          navigate(`/science/class/${cls}/performance`)
                        }}
                        className="text-left text-gray-300 hover:text-white"
                      >
                        🏆 <span>Performance</span>
                      </button>

                      <button
                        onClick={() => {
                          setMobileMenu(false)
                          navigate(`/science/class/${cls}/material`)
                        }}
                        className="text-left text-gray-300 hover:text-white"
                      >
                        📄 <span>Study Material</span>
                      </button>

                      <button
                        onClick={() => {
                          setMobileMenu(false)
                          navigate(`/science/class/${cls}/schedule`)
                        }}
                        className="text-left text-gray-300 hover:text-white"
                      >
                        📅 <span>Schedule</span>
                      </button>

                      <button
                        onClick={() => {
                          setMobileMenu(false)
                          navigate(`/science/class/${cls}/fees`)
                        }}
                        className="text-left text-gray-300 hover:text-white"
                      >
                        💰 <span>Fees</span>
                      </button>

                    
                    </div>

                  )}

                </div>

              ))}

            </div>

            <button
              onClick={() => {
               localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("user")
             localStorage.removeItem("isAdmin")
            localStorage.removeItem("unlockedClasses")
                navigate("/")
              }}
              className="text-red-400"
            >
              Logout
            </button>

          </div>

        </div>
      )}

      {/* 🟢 MAIN */}
      <div className="flex-1 p-4 md:p-8 w-full max-w-full overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-white/20 backdrop-blur-md p-6 md:p-10 rounded-xl mb-8 text-center">

          <h1 className="text-xl md:text-3xl font-bold mb-3">
            {text} <span className="text-yellow-400">{studentName}</span> !
          </h1>

          <p className="text-gray-300 text-sm md:text-base">
            Always active in your dashboard
          </p>

        </div>


        {/* 🔥 OUR STUDENTS */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-6 text-center">
            Enrolled Science Students
          </h2>
           <br />
            

          {students.length === 0 ? (
            <p className="text-center text-gray-400">
              No approved students yet
            </p>
          ) : (

            <div className="overflow-hidden w-full">

  <div className="flex gap-6 animate-scroll whitespace-nowrap">

    {students.map((student, index) => (

      <div
        key={index}
        className="min-w-[200px] flex-shrink-0 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-4 text-center"
      >

        <img
          src={
            student.profileImage
              ? student.profileImage
              : `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`
          }
          alt="student"
          className="w-16 h-16 mx-auto rounded-full mb-3 object-cover border-2 border-yellow-400"
        />

        <h3 className="font-semibold">
          {student.name}
        </h3>

        <p className="text-sm text-gray-400">
          Class {student.assignedClass}
        </p>

      </div>

    ))}

  </div>

</div>
          )}

        </div>

      </div>

      {/* 🔐 CODE MODAL */}
      {codeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">

          <div className="bg-[#0B1220] border border-white/10 rounded-xl p-6 w-full max-w-sm text-white">

            <h2 className="text-lg font-semibold mb-4 text-center">
              Enter Code for Class {selectedClass}
            </h2>

            <input
              type="text"
              value={enteredCode}
              onChange={(e) => {
                setEnteredCode(e.target.value)
                setError("")
              }}
              placeholder="Enter class code"
              className={`w-full px-4 py-2 rounded-md bg-transparent border mb-2 ${
                error ? "border-red-500" : "border-gray-500"
              }`}
            />

            {error && (
              <p className="text-red-400 text-sm mb-2">
                {error}
              </p>
            )}

            <div className="flex gap-3">

              <button
                onClick={handleVerifyCode}
                className="flex-1 bg-white text-black py-2 rounded-md"
              >
                Verify
              </button>

              <button
                onClick={() => {
                  setCodeModal(false)
                  setEnteredCode("")
                }}
                className="flex-1 border border-gray-500 py-2 rounded-md"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default Science