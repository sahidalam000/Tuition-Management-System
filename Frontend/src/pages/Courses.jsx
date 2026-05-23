import React, { useState, useEffect } from 'react'
import API from "../api/axios"
import toast from 'react-hot-toast'
import BackButton from "../components/BackButton"
import { useNavigate } from 'react-router-dom'
import course1Img from '../assets/course1.avif'
import course2Img from '../assets/course2.avif'
import coursebackImg from '../assets/courseback.avif'

const Courses = () => {

  const navigate = useNavigate()

  const [previewImage, setPreviewImage] = useState(null)
  const [fileName, setFileName] = useState("")

  const [openModal, setOpenModal] = useState(false)
  const [promo, setPromo] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)

  
  const [enrollments, setEnrollments] = useState([])

  
  // 🔥 TYPEWRITER
  const [headingText, setHeadingText] = useState('')
  const fullText = "Our Courses"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setHeadingText(fullText.substring(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(interval)
    }, 70)

    return () => clearInterval(interval)
  }, [])

  // 🔐 LOGIN CHECK
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "/courses")
      navigate("/signup")
    }
  }, [])

  // 📂 IMAGE PREVIEW
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setFileName(file.name)

      const reader = new FileReader()

      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  
const fetchEnrollments = async () => {

  try {

    const token = localStorage.getItem("token")

    const response = await API.get(
  "/enrollment/my-enrollments",
  {
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
  }
)

    setEnrollments([
  ...response.data.enrolledCourses
])



  } catch (error) {

    console.log(error)
  }
}



useEffect(() => {

  fetchEnrollments()

  const handleUpdate = () => {
    fetchEnrollments()
  }

  window.addEventListener(
    "enrollmentUpdated",
    handleUpdate
  )

  return () => {
    window.removeEventListener(
      "enrollmentUpdated",
      handleUpdate
    )
  }

}, [])

const user =
JSON.parse(
localStorage.getItem("user")
)

const isAdmin =
user?.role==="admin"

const isApproved = (course) => {

  return enrollments.some(
    (c) =>
      c.course === course &&
      c.status === "approved"
  )
}


const isPending = (course) => {

  return enrollments.some(
    (c) =>
      c.course === course &&
      c.status === "pending"
  )
}



  // 🔥 ENROLL LOGIC
  const handleEnroll = (e) => {
    e.preventDefault()

    if (promo !== "BFT123") {
      toast.error("Invalid Promo Code")
      return
    }

    const formData = new FormData(e.target)
    
    const file = formData.get("image")

    const reader = new FileReader()

    reader.onloadend = async () => {

      try {

  const base64Image = reader.result

  const token = localStorage.getItem("token")

  await API.post(
    "/enrollment/request",
    {
      course: selectedCourse,
      profileImage: base64Image,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  toast.success(
    "Request Sent! Waiting for approval"
  )

  fetchEnrollments()

  setOpenModal(false)

  setPromo('')

  setPreviewImage(null)

  setFileName("")

} catch (error) {

  toast.error(
    error.response?.data?.message ||
    "Enrollment Failed"
  )
}
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen relative text-white px-6 md:px-16 py-20">
        <div className="relative z-50 mb-8">
<BackButton to="/" />
</div>
      {/* BACKGROUND */}
      <img src={coursebackImg} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#020617]/85"></div>

      <div className="relative z-10">

        {/* HEADING */}
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          {headingText}
        </h2>

        {/* CARDS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">

          {/* MATH */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden w-full md:w-[400px] shadow-lg hover:scale-105 transition duration-300">
            <img src={course1Img} className="w-full h-[220px] object-cover" />

            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-3">Mathematics</h3>

              {

isAdmin ||

isApproved("math")

?

(

<button

onClick={()=>
navigate("/math")
}

className="
bg-white
text-black
px-5 py-2
rounded-md
"
>

Go to Course

</button>

)

:

isPending("math")

?

(

<button
className="
bg-yellow-500
text-black
px-5 py-2
rounded-md
"
>

Waiting for Approval

</button>

)

:

(

<button

onClick={()=>{

setSelectedCourse(
"math"
)

setOpenModal(
true
)

}}

className="
bg-white
text-black
px-5 py-2
rounded-md
"
>

Enroll Now

</button>

)

}

            </div>
          </div>

          {/* SCIENCE */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden w-full md:w-[400px] shadow-lg hover:scale-105 transition duration-300">
            <img src={course2Img} className="w-full h-[220px] object-cover" />

            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-3">Science</h3>

              {

isAdmin ||

isApproved("science")

?

(

<button

onClick={()=>
navigate("/science")
}

className="
bg-white
text-black
px-5 py-2
rounded-md
"
>

Go to Course

</button>

)

:

isPending("science")

?

(

<button
className="
bg-yellow-500
text-black
px-5 py-2
rounded-md
"
>

Waiting for Approval

</button>

)

:

(

<button

onClick={()=>{

setSelectedCourse(
"science"
)

setOpenModal(
true
)

}}

className="
bg-white
text-black
px-5 py-2
rounded-md
"
>

Enroll Now

</button>

)

}

            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-md text-white relative">

            <button onClick={() => setOpenModal(false)} className="absolute top-3 right-3 text-xl">
              ✕
            </button>

            <h3 className="text-2xl font-semibold text-center mb-6">
              Enroll in {selectedCourse === "math" ? "Mathematics" : "Science"}
            </h3>

            <form onSubmit={handleEnroll} className="flex flex-col gap-4">

              {/* <input
                type="text"
                name="name"
                placeholder="Student Name"
                className="px-4 py-2 rounded-md bg-transparent border border-gray-400"
                required
              /> */}

              <input
                type="text"
                placeholder="Enter Tuition Code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="px-4 py-2 rounded-md bg-transparent border border-gray-400"
                required
              />

              {/* IMAGE */}
              <div className="border border-dashed border-gray-400 rounded-lg p-4 text-center">

                <label className="cursor-pointer block">

                  {previewImage ? (
                    <img src={previewImage} className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-2 border-green-400" />
                  ) : (
                    <span className="text-sm text-gray-300 block mb-2">
                      Upload Your Photo
                    </span>
                  )}

                  <span className="text-xs text-gray-400 block">
                    {fileName ? `✅ ${fileName}` : "Click to choose image"}
                  </span>

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

              </div>

              <button className="bg-white text-black py-2 rounded-md font-medium">
                Enroll
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  )
}

export default Courses