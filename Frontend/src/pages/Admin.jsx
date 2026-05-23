import React, { useState, useEffect } from 'react'
import API from "../api/axios"

import toast from 'react-hot-toast'

const Admin = () => {

  const [editData, setEditData] = useState({})

  const handleEditChange = (studentId, field, value) => {
  setEditData({
    ...editData,
    [studentId]: {
      ...editData[studentId],
      [field]: value
    }
  })
}

const handleSaveDetails =
async(studentId)=>{

try{

const token=
localStorage.getItem(
"token"
)

await API.put(

`/admin/update-student/${studentId}`,

editData[studentId],

{
headers:{
Authorization:
`Bearer ${token}`
}
}

)

toast.success(
"Updated"
)

fetchApprovedStudents()

}catch(err){

toast.error(
"Update failed"
)

}

}


  const handleMarkPaid =
async(student)=>{

try{

const token=
localStorage.getItem(
"token"
)

let base =
student.paidTill
? new Date(student.paidTill)
: new Date(student.joinDate)

base.setMonth(
base.getMonth()+1
)

await API.put(

`/admin/update-student/${student._id}`,

{
paidTill:
base.toISOString(),

lastPaidDate:
new Date().toISOString()
},

{
headers:{
Authorization:
`Bearer ${token}`
}
}

)

toast.success(
"Paid Updated"
)

fetchApprovedStudents()

}catch{

toast.error(
"Failed"
)

}

}

 const [pendingStudents, setPendingStudents] = useState([])
  const [approvedStudents, setApprovedStudents] = useState([])

  const [studentsData, setStudentsData] = useState({
  math: [],
  science: [],
})

  
// ==============================
// 🎯 PERFORMANCE STATES
// ==============================
const [testName, setTestName] = useState("")
const [chapters, setChapters] = useState("")
const [outOf, setOutOf] = useState("")
const [marksData, setMarksData] = useState({})
const [performanceClass, setPerformanceClass] = useState("8")
const [materialChapters, setMaterialChapters] = useState("")

const [

materialLocked,
setMaterialLocked

]

=
useState(false)


const [

materialCode,
setMaterialCode

]

=
useState("")
// ==============================
// 💰 FEES STATES
// ==============================

const [feeSubject, setFeeSubject] = useState("math")
const [feeClass, setFeeClass] = useState("8")
// const [monthlyFee, setMonthlyFee] = useState("")
const [regularFee, setRegularFee] = useState("")
const [comboDiscount, setComboDiscount] = useState("")

const [originalFee, setOriginalFee] = useState("")
const [feeImage, setFeeImage] = useState(null)
const [feeFeatures, setFeeFeatures] = useState("")
const [feesData,setFeesData]= useState ([])

const [savingFee,setSavingFee]
=
useState(false)


// ==============================
// 📅 SCHEDULE STATES
// ==============================
const [scheduleSubject, setScheduleSubject] = useState("math")
const [scheduleClass, setScheduleClass] = useState("8")
const [examName, setExamName] = useState("")
const [examDate, setExamDate] = useState("")
const [examChapters, setExamChapters] = useState("")
const [timingDays, setTimingDays] = useState("")
const [timingTime, setTimingTime] = useState("")
const [scheduleData,setScheduleData]=useState ([])

const fetchFees =
async()=>{

try{

const res =
await API.get(
"/fees/all"
)

setFeesData(
res.data
)

}catch(err){

console.log(err)

}

}


 useEffect(() => {

  fetchPendingStudents()
  fetchApprovedStudents()

  fetchSchedules()
  fetchFees()


}, [])
  

  const [selectedClasses, setSelectedClasses] = useState({})

  

  // 🔥 HANDLE CLASS SELECT
  const handleClassChange = (studentId, value) => {
    setSelectedClasses({
      ...selectedClasses,
      [studentId]: value
    })
  }

const fetchPendingStudents = async () => {

  try {

    const token = localStorage.getItem("token")

    const response = await API.get(
      "/admin/pending-enrollments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    setPendingStudents(response.data)

  } catch (error) {

    console.log(error)
  }
}

const fetchApprovedStudents = async () => {

  try {

    const token = localStorage.getItem("token")

    const response = await API.get(
      "/admin/approved-students",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    setApprovedStudents(response.data)

    // ✅ convert array → grouped object
    const grouped = {
      math: [],
      science: [],
    }

    response.data.forEach((student) => {

      if (student.course === "math") {
        grouped.math.push(student)
      }

      if (student.course === "science") {
        grouped.science.push(student)
      }

    })

    setStudentsData(grouped)

  } catch (error) {

    console.log(error)

  }
}


const fetchSchedules =
async()=>{

try{

const token =
localStorage.getItem(
"token"
)

const res =
await API.get(

"/schedule/all",

{

headers:{
Authorization:
`Bearer ${token}`
}

}

)

setScheduleData(
res.data
)

}catch(err){

console.log(err)

}

}


  // 🔥 APPROVE
  const handleApprove = async (
  userId,
  course
) => {

  try {

    const token = localStorage.getItem("token")

    await API.put(
  `/admin/approve/${userId}/${course}`,
  {
    assignedClass:
      selectedClasses[userId]
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)

    toast.success(
      "Student Approved ✅"
    )

    fetchPendingStudents()
    fetchApprovedStudents()

    window.dispatchEvent(
  new Event("enrollmentUpdated")
)

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Approval Failed"
    )
  }
}

  // 🔥 ❌ REJECT / DELETE FUNCTION
  const handleReject = (course, studentId) => {

    const enrollments = JSON.parse(localStorage.getItem("enrollments")) || {}

    // remove student
    enrollments[course] = enrollments[course].filter(
      (s) => s.id !== studentId
    )

    localStorage.setItem("enrollments", JSON.stringify(enrollments))
    
    toast.success("Enrollment Rejected ❌")
  }


const handleRemoveStudent =
async(studentId)=>{

try{

const token =
localStorage.getItem(
"token"
)

await API.delete(

`/admin/remove-student/${studentId}`,

{
headers:{
Authorization:
`Bearer ${token}`
}
}

)

toast.success(
"Student removed"
)

fetchApprovedStudents()

}catch{

toast.error(
"Remove failed"
)

}

}

// ==============================
// 🎯 MARKS HANDLING
// ==============================

const handleMarksChange = (studentId, value) => {
  setMarksData({
    ...marksData,
    [studentId]: Number(value)
  })
}

const handleAddMarks =
async(course)=>{

try{

const token =
localStorage.getItem(
"token"
)

const students =
studentsData[course]
.filter(

s=>

String(
s.assignedClass
)

===

String(
performanceClass
)

)


for(

const student
of students

){

const mark =

marksData[
student._id
]

if(
mark===undefined
)

continue


await API.put(

`/admin/add-marks/

${student._id}

/${course}`,

{

test:
testName,

marks:
mark,

outOf,

chapters

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

)

}


toast.success(
"Marks Added"
)

fetchApprovedStudents()

setMarksData({})

setTestName("")

setOutOf("")

setChapters("")


}catch{

toast.error(
"Failed"
)

}

}


const handleEditMarks = (course, studentId, testIndex, newMarks) => {

  const studentsDB = JSON.parse(localStorage.getItem("students")) || {}

  studentsDB[course] = studentsDB[course].map((student) => {

    if (student.id !== studentId) return student

    const updatedMarks = [...(student.marks || [])]

    updatedMarks[testIndex].marks = Number(newMarks)

    return {
      ...student,
      marks: updatedMarks
    }
  })

  localStorage.setItem("students", JSON.stringify(studentsDB))
  setStudentsData(studentsDB)

  toast.success("Marks Updated ✏️")
}

const handleDeleteMarks = (course, studentId, testIndex) => {

  const studentsDB = JSON.parse(localStorage.getItem("students")) || {}

  studentsDB[course] = studentsDB[course].map((student) => {

    if (student.id !== studentId) return student

    const updatedMarks = (student.marks || []).filter(
      (_, index) => index !== testIndex
    )

    return {
      ...student,
      marks: updatedMarks
    }
  })

  localStorage.setItem("students", JSON.stringify(studentsDB))
  setStudentsData(studentsDB)

  toast.success("Marks Deleted 🗑️")
}

// ==============================
// 💰 ADD FEES
// ==============================

const handleSaveFees =
async()=>{

  setSavingFee(
true
)

try{

const token =
localStorage.getItem(
"token"
)

if(

!regularFee ||

!originalFee ||

!feeImage

){

toast.error(
"Fill all fields"
)

return

}

const formData =
new FormData()


// subject
formData.append(

"course",

feeSubject

)


// class
formData.append(

"assignedClass",

feeClass

)


// fees
formData.append(

"regularFee",

regularFee

)

formData.append(

"originalFee",

originalFee

)

formData.append(

"comboDiscount",

comboDiscount

)


// image file
formData.append(

"image",

feeImage

)


// features array
formData.append(

"features",

JSON.stringify(

feeFeatures

.split(",")

.map(

f=>f.trim()

)

)

)

await API.post(

"/fees/save",

formData,

{


headers:{

Authorization:
`Bearer ${token}`,

"Content-Type":

"multipart/form-data"

}

}

)

toast.success(
"Saved"
)

// clear fields

setRegularFee("")

setOriginalFee("")

setComboDiscount("")

setFeeImage(null)

setFeeFeatures("")



}

catch(err){

console.log(err)

toast.error(
"Failed"
)

}

finally{

setSavingFee(
false
)

}

}

// ==============================
// 🗑 DELETE FEES
// ==============================

const handleDeleteFees =
async(id)=>{

try{

const token=
localStorage.getItem(
"token"
)

await API.delete(

`/fees/delete/${id}`,

{

headers:{
Authorization:
`Bearer ${token}`
}

}

)

toast.success(
"Deleted"
)

fetchFees()

}catch{

toast.error(
"Failed"
)

}

}

const [materialSubject, setMaterialSubject] = useState("math")
const [materialClass, setMaterialClass] = useState("8")
const [materialType, setMaterialType] = useState("exam") // exam / model
const [materialName, setMaterialName] = useState("")
const [pdfLink, setPdfLink] = useState(null)
const [

uploadingMaterial,

setUploadingMaterial

]

=

useState(false)

// MAterial

const handleAddMaterial =
async(studentId,course)=>{

if(
!materialName ||
!pdfLink
){

toast.error(
"Fill all fields"
)

return
}

setUploadingMaterial(
true
)

try{

const token =
localStorage.getItem(
"token"
)



// send backend

const formData =
new FormData()

formData.append(
"pdf",
pdfLink
)

formData.append(
"course",
course
)

formData.append(
"type",
materialType
)

formData.append(
"name",
materialName
)

formData.append(

"isLocked",

materialLocked

)

formData.append(

"accessCode",

materialCode

)

formData.append(

"chapters",

JSON.stringify(

materialChapters
.split(",")

.map(
c=>c.trim()
)

)

)

await API.put(

`/admin/add-material/${studentId}`,

formData,

{

headers:{

Authorization:
`Bearer ${token}`,
"Content-Type":
"multipart/form-data"

}

}

)

toast.success(
"Material uploaded"
)



setMaterialName("")
setPdfLink(null)
setMaterialChapters("")
setMaterialLocked(false)

setMaterialCode("")

try{

await fetchApprovedStudents()

}catch(err){

console.log(
"Refresh failed:",
err
)

}

}catch (err) {

  console.log(err)

toast.error(

  err.response?.data?.message

||

"Failed"
)

}

finally{

setUploadingMaterial(
false
)

}


}


const handleDeleteMaterial =
async(

studentId,
course,
materialId

)=>{

try{

const token =
localStorage.getItem(
"token"
)

await API.delete(

`/admin/delete-material/

${studentId}

/${course}

/${materialId}`,

{

headers:{
Authorization:
`Bearer ${token}`
}

}

)

toast.success(
"Deleted"
)

try{

await fetchApprovedStudents()

}catch(err){

console.log(
"Refresh failed:",
err
)

}



}catch (err) {

  console.log(err)

toast.error(
"Failed"
)

}

}


const handleAddExam =
async()=>{

try{

if(
!examName ||
!examDate
){

toast.error(
"Fill exam details"
)

return

}

const token =
localStorage.getItem(
"token"
)

await API.post(

"/schedule/add-exam",

{

course:
scheduleSubject,

assignedClass:
scheduleClass,

name:
examName,

date:
examDate,

chapters:
examChapters

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

)

toast.success(
"Exam Added"
)

setExamName("")
setExamDate("")
setExamChapters("")

}catch(err){

console.log(err)

toast.error(
"Failed"
)

}

}

const handleDeleteExam =
async(

course,
assignedClass,
examId

)=>{

try{

const token =
localStorage.getItem(
"token"
)

await API.delete(

`/schedule/delete-exam/

${course}

/${assignedClass}

/${examId}`,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

)

toast.success(
"Deleted"
)

}catch{

toast.error(
"Failed"
)

}

}

const handleAddTiming =
async()=>{

try{

if(
!timingDays ||
!timingTime
){

toast.error(
"Fill timing"
)

return

}

const token =
localStorage.getItem(
"token"
)

await API.post(

"/schedule/add-timing",

{

course:
scheduleSubject,

assignedClass:
scheduleClass,

days:
timingDays,

time:
timingTime

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

)

toast.success(
"Timing Added"
)

setTimingDays("")
setTimingTime("")

}catch(err){

console.log(err)

toast.error(
"Failed"
)

}

}

const handleDeleteTiming =
async(

course,
assignedClass,
timingId

)=>{

try{

const token =
localStorage.getItem(
"token"
)

await API.delete(

`/schedule/delete-timing/

${course}

/${assignedClass}

/${timingId}`,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

)

toast.success(
"Deleted"
)

}catch{

toast.error(
"Failed"
)

}

}


  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 md:px-16 py-10">

      <h2 className="text-3xl font-bold text-center mb-10">
        Admin Panel
      </h2>

      {pendingStudents.length === 0 && (
        <p className="text-center text-gray-400">
          No enrollments yet
        </p>
      )}

      <div className="flex flex-col gap-8">

  {pendingStudents.map((student) => (

    <div
      key={student._id}
      className="bg-white/10 border border-white/20 p-6 rounded-lg backdrop-blur-md"
    >

      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <img
            src={
              student.profileImage ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`
            }
            alt="student"
            className="w-14 h-14 rounded-full object-cover border border-white/20"
          />

          <div>

            <p className="font-semibold text-lg">
              {student.name}
            </p>

            <p className="text-sm text-gray-400">
              {student.email}
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex gap-3 items-center">

          <select
            value={
  selectedClasses[student.userId] || ""
}
            onChange={(e) =>
              handleClassChange(
  student.userId,
  e.target.value
)
            }
            className="px-3 py-2 bg-black/30 border border-gray-500 rounded-md text-white"
          >
            <option value="">
              Select Class
            </option>

            <option value="8">
              Class 8
            </option>

            <option value="9">
              Class 9
            </option>

            <option value="10">
              Class 10
            </option>

          </select>

          {/* COURSE BUTTONS */}

       {/* APPROVE BUTTON */}

<button
  onClick={() =>
    handleApprove(
      student.userId,
      student.course
    )
  }
  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
>
  Approve {student.course}
</button>

        </div>

      </div>

    </div>

  ))}

</div>


      {/* ✅ YAHI ADD KARNA HAI */}
<div className="mt-10">

  <h3 className="text-xl font-semibold mb-4 text-green-400">
    Approved Students
  </h3>

  {Object.entries(studentsData).map(([course, students]) => ( 

    <div key={course} className="mb-6">

      <h4 className="font-medium mb-3">{course.toUpperCase()}</h4>

      {students.length === 0 ? (
        <p className="text-gray-400">No students</p>
      ) : (


        <div className="flex flex-col gap-3">

  {students.map((student) => (

    <div
      key={student._id}
      className="bg-white/10 p-4 rounded-lg space-y-3"
    >

      {/* 🔥 TOP INFO */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <img
            src={student.profileImage}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p>{student.name}</p>
            <p className="text-sm text-gray-400">
              Class {student.assignedClass}
            </p>
          </div>

        </div>


      </div>

      {/* 🔥 EDIT SECTION */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">

  {/* JOIN DATE */}
  <div>
    <p className="text-gray-400 mb-1">Join Date</p>
    <input
      type="date"
      defaultValue={
    student.joinDate
      ? new Date(student.joinDate).toISOString().split("T")[0]
      : ""
  }
      onChange={(e) =>
        handleEditChange(student._id, "joinDate", e.target.value ? new Date(e.target.value).toISOString() : null

        )
      }
      className="bg-black/30 p-2 rounded w-full"
    />
  </div>

  {/* LAST PAID */}
  <div>
    <p className="text-gray-400 mb-1">Last Paid Date</p>
    <input
      type="date"
       defaultValue={
    student.lastPaidDate
      ? new Date(student.lastPaidDate).toISOString().split("T")[0]
      : ""
  }
      onChange={(e) =>
        handleEditChange(student._id, "lastPaidDate", e.target.value ? new Date(e.target.value).toISOString() : null

        )
      }
      className="bg-black/30 p-2 rounded w-full"
    />
  </div>

  {/* AUTO DUE PREVIEW */}
  <div>
    <p className="text-gray-400 mb-1">Next Due (Auto)</p>
    <input
      type="text"
      disabled
      value={
  student.joinDate
    ? (() => {
        const join = new Date(student.joinDate)
        const today = new Date()

        let next = new Date(join)

        while (next <= today) {
          next.setMonth(next.getMonth() + 1)
        }

        return next.toLocaleDateString()
      })()
    : "Set join date"
}
      className="bg-black/30 p-2 rounded w-full text-gray-400"
    />
  </div>

  

  {/* 🔥 OVERDUE STATUS */}
{/* 🔥 OVERDUE STATUS */}
<div>
  <p className="text-gray-400 mb-1">Status</p>

{(() => {
  if (!student.joinDate) {
    return <span className="text-gray-400">No data</span>
  }

  const today = new Date()
  const join = new Date(student.joinDate)

  const firstDue = new Date(join)
  firstDue.setMonth(firstDue.getMonth() + 1)

  // 🔴 never paid
  if (!student.paidTill) {
    if (today > firstDue) {
      const overdueDays = Math.floor(
        (today - firstDue) / (1000 * 60 * 60 * 24)
      )

      return (
        <span className="text-red-400">
          🔴 {overdueDays} days overdue
        </span>
      )
    }

    return <span className="text-green-400">✅ On Time</span>
  }

  // ✅ paid case
  const paid = new Date(student.paidTill)
  const nextDue = new Date(paid)
  nextDue.setMonth(nextDue.getMonth() + 1)

  if (today > nextDue) {
    const overdueDays = Math.floor(
      (today - nextDue) / (1000 * 60 * 60 * 24)
    )

    return (
      <span className="text-red-400">
        🔴 {overdueDays} days overdue
      </span>
    )
  }

  const daysLeft = Math.ceil(
    (nextDue - today) / (1000 * 60 * 60 * 24)
  )

  if (daysLeft <= 5) {
    return (
      <span className="text-yellow-400">
        🟡 Due in {daysLeft} days
      </span>
    )
  }

  return <span className="text-green-400">✅ On Time</span>
})()}

</div>

</div>

      {/* 🔥 ACTION BUTTONS */}
      <div className="flex gap-3">

        <button
          onClick={() => handleSaveDetails( student._id)}
          className="bg-blue-500 px-3 py-1 rounded text-sm"
        >
          Save
        </button>

        <button
          onClick={() => handleMarkPaid(student)}
          className="bg-green-500 px-3 py-1 rounded text-sm"
        >
          Mark Paid
        </button>

        <button
onClick={() =>
handleRemoveStudent(
student._id
)
}

className="bg-red-500 px-3 py-1 rounded text-sm"
>
Remove
</button>

      </div>

    </div>

  ))}

</div>

      )}

    </div>

  ))}

</div>


  {/* ============================== */}
{/* 🎯 PERFORMANCE MANAGER */}
{/* ============================== */}

<div className="mt-16">

  <h3 className="text-xl font-semibold mb-4 text-yellow-400">
    📊 Performance Manager
  </h3>


  <select
  value={performanceClass}
  onChange={(e) => setPerformanceClass(e.target.value)}
  className="bg-black/30 p-2 rounded mb-6"
>
  <option value="8">Class 8</option>
  <option value="9">Class 9</option>
  <option value="10">Class 10</option>
</select>

  {Object.entries(studentsData).map(([course, students]) => (

    <div key={course} className="mb-8 bg-white/10 p-6 rounded-lg">

      <h4 className="mb-4 font-semibold">
  {course === "math"
  ? "📘 Mathematics"
  : "🧪 Science"} - Class {performanceClass}
</h4>

      {/* TEST NAME */}
      <div className="flex gap-3 mb-4">

        <input
          type="text"
          placeholder="Enter Test Name (Test 1)"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="bg-black/30 p-2 rounded w-full"
        />

        <input
  type="number"
  placeholder="Out of ( 50 / 100)"
  value={outOf}
  onChange={(e) => setOutOf(e.target.value)}
  className="bg-black/30 p-2 rounded w-full"
/>

        <input
  type="text"
  placeholder="Chapters (comma separated)"
  value={chapters}
  onChange={(e) => setChapters(e.target.value)}
  className="bg-black/30 p-2 rounded w-full"
/>

        <button
          onClick={() => handleAddMarks(course)}
          className="bg-yellow-500 px-4 py-2 rounded"
        >
          Add Marks
        </button>

      </div>

      {/* STUDENTS MARK INPUT */}
      <div className="grid md:grid-cols-2 gap-4">

        {students
  // .filter((student) => student.class === performanceClass)
  .filter(
(student)=>

String(
student.assignedClass
)

===

String(
performanceClass
)
)

  .map((student) => (

          <div
            key={student._id}
            className="bg-black/30 p-3 rounded flex items-center justify-between"
          >

            <p>{student.name}</p>

            <input
              type="number"
              placeholder="Marks"
              value={marksData[student._id] || ""}
              onChange={(e) =>
                handleMarksChange(student._id, e.target.value)
              }
              className="w-20 p-1 rounded bg-black/50 text-center"
            />

          </div>

        ))}

        <div className="mt-4 space-y-3">

      {students
  // .filter((student) => student.class === performanceClass)
  .filter(
(student)=>

String(
student.assignedClass
)

===

String(
performanceClass
)
)

  .map((student) => (

    <div key={student._id} className="bg-black/30 p-3 rounded">

      <p className="mb-2 font-medium">{student.name}</p>

      {(student.marks || []).map((m, index) => (

        <div
          key={index}
          className="flex items-center justify-between gap-3 mb-2"
        >

          <div>
            <p className="text-sm">{m.test}</p>
            <p className="text-xs text-gray-400">
              {m.chapters?.join(", ")}
            </p>
          </div>

          <input
            type="number"
            defaultValue={m.marks}
            onBlur={(e) =>
              handleEditMarks(course, student._id, index, e.target.value)
            }
            className="w-20 p-1 rounded bg-black/50 text-center"
          />

          <button
            onClick={() =>
              handleDeleteMarks(course, student._id, index)
            }
            className="bg-red-500 px-2 py-1 rounded text-xs"
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  ))}

</div>

      </div>

    </div>

  ))}

</div>

<div className="mt-16 bg-white/10 p-6 rounded-lg">

  <h3 className="text-xl font-semibold mb-4 text-blue-400">
    📄 Study Material Manager
  </h3>

  <div className="grid md:grid-cols-5 gap-3 mb-4">


    <select
  value={materialSubject}
  onChange={(e) => setMaterialSubject(e.target.value)}
  className="bg-black/30 p-2 rounded"
>
  <option value="math">Mathematics</option>
  <option value="science">Science</option>
</select>


    {/* CLASS */}
    <select
      value={materialClass}
      onChange={(e) => setMaterialClass(e.target.value)}
      className="bg-black/30 p-2 rounded"
    >
      <option value="8">Class 8</option>
      <option value="9">Class 9</option>
      <option value="10">Class 10</option>
    </select>

    {/* TYPE */}
    <select
      value={materialType}
      onChange={(e) => setMaterialType(e.target.value)}
      className="bg-black/30 p-2 rounded"
    >
      <option value="exam">Exam Paper</option>
      <option value="model">Model Paper</option>
    </select>

    {/* NAME */}
    <input
      type="text"
      placeholder="Test 1 / Model Paper 1"
      value={materialName}
      onChange={(e) => setMaterialName(e.target.value)}
      className="bg-black/30 p-2 rounded"
    />


    <div className="mt-3">

<label className="flex items-center gap-2">

<input

type="checkbox"

checked={materialLocked}

onChange={(e)=>

setMaterialLocked(
e.target.checked
)

}

/>

Lock this paper with secret code

</label>

</div>


{

materialLocked && (

<input

type="text"

placeholder="
Enter secret code
"

value={materialCode}

onChange={(e)=>

setMaterialCode(
e.target.value
)

}

className="
w-full
mt-3
p-2
rounded
bg-black/20
border
border-white/20
"

/>

)

}

    {/* PDF LINK */}
    <input
type="file"
accept=".pdf"

onChange={(e)=>

setPdfLink(
e.target.files[0]
)

}

className="
bg-black/30
p-2
rounded
"
/>

    <input
  type="text"
  placeholder="Chapters (comma separated)"
  value={materialChapters}
  onChange={(e) => setMaterialChapters(e.target.value)}
  className="bg-black/30 p-2 rounded"
/>

  </div>

<button

onClick={() => {

const student =

studentsData[
materialSubject
]

.find(

s =>

String(
s.assignedClass
)

===

String(
materialClass
)

&&

s.course ===
materialSubject

)

if(student){

handleAddMaterial(

student._id,

materialSubject

)

}

}}

disabled={
uploadingMaterial
}

className={`

px-4
py-2
rounded
text-white

${

uploadingMaterial

?

"bg-gray-500"

:

"bg-blue-500 hover:bg-blue-600"

}

`}

>

{

uploadingMaterial

?

"Uploading PDF..."

:

"Upload Material"

}

</button>

<div className="mt-8">

<h4 className="text-lg mb-4">

📚 Uploaded Materials
(
{materialSubject}
Class {materialClass}
)

</h4>


{

studentsData[materialSubject]

.filter(

student=>

String(
student.assignedClass
)

===

String(
materialClass
)

)

[0]

?.materials

?.map(

paper=>(

<div

key={paper._id}

className="
bg-black/30
p-4
mb-3
rounded
flex
justify-between
items-center
"

>

<div>

<p>

{paper.name}

</p>

<p
className="
text-xs
text-gray-400
"
>

{paper.type}

|

Class

{materialClass}

</p>


{

paper.isLocked && (

<p
className="
text-yellow-400
text-xs
"
>

🔒 Locked

</p>

)

}

</div>


<button

onClick={()=>{

const student =

studentsData[
materialSubject
]

.find(

s=>

String(
s.assignedClass
)

===

String(
materialClass
)

&&

s.course ===
materialSubject

)

handleDeleteMaterial(

student._id,

materialSubject,

paper._id

)

}}

className="
bg-red-500
px-3
py-1
rounded
"

>

Delete

</button>

</div>

)
)
}

</div>


</div>

{/* ============================== */}
{/* 📅 SCHEDULE MANAGER */}
{/* ============================== */}

<div className="mt-16 bg-white/10 p-6 rounded-lg">

  <h3 className="text-xl font-semibold mb-4 text-purple-400">
    📅 Schedule Manager
  </h3>


  <div className="mb-4">

  <label className="block mb-2 text-sm text-gray-300">
    Select Subject
  </label>

  <select
    value={scheduleSubject}
    onChange={(e) =>
      setScheduleSubject(e.target.value)
    }
    className="w-full bg-[#0B1220] border border-white/10 rounded-lg px-4 py-3"
  >
    <option value="math">
      Mathematics
    </option>

    <option value="science">
      Science
    </option>

  </select>

</div>


  {/* CLASS SELECT */}
  <select
    value={scheduleClass}
    onChange={(e) => setScheduleClass(e.target.value)}
    className="bg-black/30 p-2 rounded mb-4"
  >
    <option value="8">Class 8</option>
    <option value="9">Class 9</option>
    <option value="10">Class 10</option>
  </select>

  {/* ================= */}
  {/* ADD EXAM */}
  {/* ================= */}

  <div className="grid md:grid-cols-3 gap-3 mb-4">

    <input
      type="text"
      placeholder="Test Name"
      value={examName}
      onChange={(e) => setExamName(e.target.value)}
      className="bg-black/30 p-2 rounded"
    />

    <input
      type="date"
      value={examDate}
      onChange={(e) => setExamDate(e.target.value)}
      className="bg-black/30 p-2 rounded"
    />

    <input
      type="text"
      placeholder="Chapters"
      value={examChapters}
      onChange={(e) => setExamChapters(e.target.value)}
      className="bg-black/30 p-2 rounded"
    />

  </div>

  <button
    onClick={handleAddExam}
    className="bg-purple-500 px-4 py-2 rounded mb-9"
  >
    Add Exam
  </button>

  
  {/* ================= */}
  {/* ADD TIMING */}
  {/* ================= */}

  <div className="grid md:grid-cols-2 gap-3 mb-4">

    <input
      type="text"
      placeholder="Days (Mon-Sat)"
      value={timingDays}
      onChange={(e) => setTimingDays(e.target.value)}
      className="bg-black/30 p-2 rounded"
    />

    <input
      type="text"
      placeholder="Time (5PM - 6PM)"
      value={timingTime}
      onChange={(e) => setTimingTime(e.target.value)}
      className="bg-black/30 p-2 rounded"
    />

  </div>

  <button
    onClick={handleAddTiming}
    className="bg-green-500 px-4 py-2 rounded mb-6"
  >
    Add Timing
  </button>
   

<div className="space-y-6 mt-8">

{scheduleData.map(schedule=>(

<div
key={schedule._id}

className="
bg-[#0B1220]
border
border-white/10
rounded-xl
p-5
"
>

<h3
className="
text-lg
font-semibold
text-purple-400
mb-5
"
>

📚 {schedule.course.toUpperCase()}

|

Class {schedule.assignedClass}

</h3>



{/* EXAMS */}

<div className="mb-6">

<p
className="
text-yellow-400
font-semibold
mb-3
"
>

📅 Exams

</p>


{schedule.exams.length===0 ? (

<p className="text-gray-400">

No exams

</p>

)

:

schedule.exams.map(

exam=>(

<div

key={exam._id}

className="
flex
justify-between
items-center

bg-white/5

p-3

rounded-lg

mb-2
"

>

<div>

<p>

{exam.name}

</p>

<p
className="
text-xs
text-gray-400
"
>

{

new Date(
exam.date
)

.toDateString()

}

</p>

</div>


<button

onClick={()=>

handleDeleteExam(

schedule.course,

schedule.assignedClass,

exam._id

)

}

className="
bg-red-500
px-3
py-1
rounded
"

>

Delete

</button>

</div>

)

)

}

</div>



{/* TIMINGS */}

<div>

<p
className="
text-green-400
font-semibold
mb-3
"
>

⏰ Timings

</p>


{

schedule.timings.length===0

?

(

<p className="text-gray-400">

No timings

</p>

)

:

schedule.timings.map(

t=>(

<div

key={t._id}

className="
flex
justify-between
items-center

bg-white/5

p-3

rounded-lg

mb-2
"

>

<div>

<p>

{t.days}

</p>

<p
className="
text-xs
text-gray-400
"
>

{t.time}

</p>

</div>


<button

onClick={()=>

handleDeleteTiming(

schedule.course,

schedule.assignedClass,

t._id

)

}

className="
bg-red-500
px-3
py-1
rounded
"

>

Delete

</button>

</div>

)

)

}

</div>

</div>

))}

</div>
              

</div>


  {/* ============================== */}
{/* 💰 FEES MANAGER */}
{/* ============================== */}

<div className="mt-16 bg-white/10 p-6 rounded-lg">

  <h3 className="text-xl font-semibold mb-6 text-green-400">
    💰 Fees Manager
  </h3>


  <div className="mb-4">

  <label className="block mb-2 text-sm text-gray-300">
    Select Subject
  </label>

  <select
    value={feeSubject}
    onChange={(e) =>
      setFeeSubject(e.target.value)
    }
    className="w-full bg-[#0B1220] border border-white/10 rounded-lg px-4 py-3"
  >
    <option value="math">
      Mathematics
    </option>

    <option value="science">
      Science
    </option>

  </select>

</div>


  {/* FORM */}
  <div className="grid md:grid-cols-2 gap-4 mb-4">

    {/* CLASS */}
    <select
      value={feeClass}
      onChange={(e) => setFeeClass(e.target.value)}
      className="bg-black/30 p-2 rounded"
    >
      <option value="8">Class 8</option>
      <option value="9">Class 9</option>
      <option value="10">Class 10</option>
    </select>

    {/* MONTHLY */}
    {/* <input
      type="number"
      placeholder="Monthly Fee (500)"
      value={monthlyFee}
      onChange={(e) => setMonthlyFee(e.target.value)}
      className="bg-black/30 p-2 rounded"
    /> */}

    {/* SUBJECT */}
<select
  value={feeSubject}
  onChange={(e) => setFeeSubject(e.target.value)}
  className="bg-[#0B1220] border border-white/20 p-3 rounded-lg"
>
  <option value="math">Mathematics</option>
  <option value="science">Science</option>
</select>

{/* REGULAR FEE */}
<input
  type="number"
  placeholder="Regular Monthly Fee"
  value={regularFee}
  onChange={(e) => setRegularFee(e.target.value)}
  className="bg-[#0B1220] border border-white/20 p-3 rounded-lg"
/>

{/* COMBO FEE */}
{feeSubject === "science" && (

  <input
  type="number"
  placeholder="Combo Discount Amount (200)"
  value={comboDiscount}
  onChange={(e) =>
    setComboDiscount(e.target.value)
  }
  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3"
/>

)}

    {/* ORIGINAL */}
    <input
      type="number"
      placeholder="Original Fee (800)"
      value={originalFee}
      onChange={(e) => setOriginalFee(e.target.value)}
      className="bg-black/30 p-2 rounded"
    />

    {/* IMAGE */}
    <input

type="file"

accept="image/*"

onChange={(e)=>

setFeeImage(

e.target.files[0]

)

}

className="
bg-black/30
p-2
rounded
"

/>

  </div>

  {/* FEATURES */}
  <textarea
    placeholder="Features (comma separated)"
    value={feeFeatures}
    onChange={(e) => setFeeFeatures(e.target.value)}
    className="bg-black/30 p-2 rounded w-full h-24 mb-4"
  />

  {/* SAVE BUTTON */}
  <button

onClick={
handleSaveFees
}

disabled={
savingFee
}

className={`
px-4
py-2
rounded
text-white

${
savingFee

?

"bg-gray-500"

:

"bg-green-500 hover:bg-green-600"

}
`}

>

{

savingFee

?

"Saving..."

:

"Save Fees"

}

</button>

  {/* ============================== */}
  {/* 📋 FEES LIST */}
  {/* ============================== */}

  <div className="mt-8 space-y-4">

    {feesData.map(fee=>(

<div
key={fee._id}

className="
bg-black/30
p-4
rounded
flex
justify-between
"
>

<div>

<p>

{fee.course}

Class

{fee.assignedClass}

</p>

<p>

₹{fee.regularFee}

</p>

</div>


<button

onClick={()=>

handleDeleteFees(
fee._id
)

}

className="
bg-red-500
px-3
rounded
"

>

Delete

</button>

</div>

))}

  </div>

</div>


    </div>
  )
}




export default Admin