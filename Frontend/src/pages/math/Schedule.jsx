import React,
{
useEffect,
useState
}
from "react"
import API from "../../api/axios"
import BackButton from "../../components/BackButton"

const Schedule = () => {

  // 📦 Get data
  const [schedule,
setSchedule]

=

useState({

exams:[],
timings:[]
})


useEffect(()=>{

fetchSchedule()

},[])


const fetchSchedule =
async()=>{

  try{

const token =
localStorage.getItem(
"token"
)

const res =
await API.get(

`/schedule/math/${classNumber}`,

{

headers:{
Authorization:
`Bearer ${token}`
}

}

)

setSchedule(
res.data
)

} catch {

  console.log(
"Failed"
)

}

}

  // 📍 Get class from URL
  const path = window.location.pathname
  const classNumber = path.split("/")[3]

  

  // ==============================
  // 📅 DATE STATUS HELPER (🔥 IMPORTANT: upar hona chahiye)
  // ==============================
  const getExamStatus = (date) => {
    const today = new Date()
    const examDate = new Date(date)

    const diff = Math.ceil(
      (examDate - today) / (1000 * 60 * 60 * 24)
    )

    if (diff < 0) return "completed"
    if (diff === 0) return "today"
    if (diff === 1) return "tomorrow"

    return "upcoming"
  }

  // ==============================
// ⏳ COUNTDOWN FUNCTION
// ==============================
const getCountdown = (date) => {
  const now = new Date()
  const examDate = new Date(date)

  const diff = examDate - now

  if (diff <= 0) return "Started / Done"

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )

  return `${days}d ${hours}h left`
}



const isUrgent = (date) => {
  const today = new Date()
  const examDate = new Date(date)

  const diff = Math.ceil(
    (examDate - today) / (1000 * 60 * 60 * 24)
  )

  return diff >= 0 && diff <= 3
}

  // ==============================
  // 📊 SPLIT EXAMS
  // ==============================
  const exams = schedule.exams || []

  const upcomingExams = exams
    .filter(e => getExamStatus(e.date) !== "completed")
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  const completedExams = exams
    .filter(e => getExamStatus(e.date) === "completed")
    .sort((a, b) => new Date(b.date) - new Date(a.date))


  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">

        <BackButton to="/math" />
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-10">
        📅 Schedule - Class {classNumber}
      </h1>

      {/* ===================== */}
      {/* 📅 EXAMS */}
      {/* ===================== */}
      <div className="mb-12">

        <h2 className="text-xl mb-4 text-yellow-400">
          🔔 Upcoming Exams
        </h2>

        {upcomingExams.length === 0 ? (
          <p className="text-gray-400 mb-6">No upcoming exams</p>
        ) : (

          <div className="flex flex-col gap-3 mb-10">

            {upcomingExams.map((exam, index) => {

              const status = getExamStatus(exam.date)

              return (
                <div
                  key={index}
                  className={`p-5 rounded-xl flex justify-between items-center border transition-all duration-300
${isUrgent(exam.date)
  ? "bg-red-500/10 border-red-400 shadow-lg shadow-red-500/10"
  : "bg-yellow-500/10 border-yellow-400"
}`}
                >

                  <div>
                    <p className="font-semibold">{exam.name}</p>

 

                    <p className="text-sm text-gray-400">
                      {new Date(exam.date).toDateString()}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
  {exam.chapters?.map((ch, i) => (
    <span
      key={i}
      className="bg-blue-500/10 text-blue-300 px-2 py-1 rounded text-xs border border-blue-400/20"
    >
      {ch}
    </span>
  ))}
   </div>
                  </div>

                  {/* 🔥 REMINDER */}
              <div className="flex flex-col items-end gap-1">

  {/* 🔴 ALERT DOT */}
  {isUrgent(exam.date) && (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
      <span className="text-xs text-red-400">Alert</span>
    </div>
  )}

  {/* STATUS */}
  <div className="text-sm font-semibold">

    {status === "today" && (
      <span className="text-red-400 font-bold">🔥 Today</span>
    )}

    {status === "tomorrow" && (
      <span className="text-yellow-400 font-bold">⏳ Tomorrow</span>
    )}

    {status === "upcoming" && (
      <span className="text-green-400">📅 Upcoming</span>
    )}

  </div>

  {/* COUNTDOWN */}
  <p className="text-xs text-gray-400">
    {getCountdown(exam.date)}
  </p>

</div>

                </div>
              )
            })}

          </div>
        )}

        {/* ===================== */}
        {/* COMPLETED */}
        {/* ===================== */}
        <h2 className="text-xl mb-4 text-green-400">
          ✅ Completed Exams
        </h2>

        {completedExams.length === 0 ? (
          <p className="text-gray-400">No completed exams</p>
        ) : (

          <div className="flex flex-col gap-3">

            {completedExams.map((exam, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 p-4 rounded-lg flex justify-between items-center"
              >

                <div>
                  <p className="font-semibold">{exam.name}</p>

                  <p className="text-sm text-gray-400">
                    {new Date(exam.date).toDateString()}
                  </p>

                  <p className="text-xs text-gray-500">
                    {exam.chapters?.join(", ")}
                  </p>
                </div>

                <span className="text-gray-400 text-sm">
                  ✔ Done
                </span>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* ===================== */}
      {/* ⏰ TIMINGS */}
      {/* ===================== */}
      <div>

        <h2 className="text-xl mb-4 text-green-400">
          ⏰ Class Timings
        </h2>

        {schedule.timings.length === 0 ? (
          <p className="text-gray-400">No timings set</p>
        ) : (

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">

            {schedule.timings.map((t, index) => (

              <div
                key={index}
                className="bg-white/10 border border-white/20 p-4 rounded-lg"
              >
                <p className="font-semibold">
  📅 {t.days}
</p>

<p className="text-gray-400">
  ⏰ {t.time}
</p>
              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  )
}

export default Schedule