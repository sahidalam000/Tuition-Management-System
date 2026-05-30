  import React,
  {
  useState,
  useEffect
  }
  from "react"
  import API
  from "../../api/axios"
  import toast
  from "react-hot-toast"
  import BackButton from "../../components/BackButton"


  const Material = () => {
      

    const [materials,
  setMaterials]
  =
  useState([])

  const [

showCodeModal,
setShowCodeModal

]

=
useState(false)


const [

enteredCode,
setEnteredCode

]

=
useState("")


const [

selectedPaper,
setSelectedPaper

]

=
useState(null)
    

    const path = window.location.pathname
    const classNumber = path.split("/")[3]

    useEffect(()=>{

  fetchMaterials()

  },[])


  const fetchMaterials=
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

  const filtered=

  res.data.filter(

  student=>

  String(
  student.assignedClass
  )

  ===

  String(
  classNumber
  )

  &&

  student.course==="science"

  )

  setMaterials(
  filtered
  )

  }catch{

  toast.error(
  "Failed"
  )

  }

  }

  

    return (
      <div className="min-h-screen bg-[#020617] text-white px-6 py-10">
      <BackButton to="/science" />
        <h1 className="text-3xl font-bold text-center mb-10">
          📄 Science Material - Class {classNumber}
        </h1>

        {/* ===================== */}
        {/* 📘 EXAM PAPERS */}
        {/* ===================== */}

        <div className="mb-12">

          <h2 className="text-xl mb-4 text-yellow-400">
            📘 Exam Papers
          </h2>

          {materials.flatMap(

  student=>

  student.materials
  ?.filter(

  m=>

  m.type==="exam"

  )

  ).length===0 && (

  <p className="text-gray-400">

  No exam papers uploaded

  </p>

  )}



  <div className="grid md:grid-cols-2 gap-4">

  {

  materials.flatMap(

  student=>

  student.materials

  ?.filter(

  m=>

  m.type==="exam"

  )

  .map(

  paper=>(

  <div
  key={paper._id}

  className="
  bg-white/10
p-4
rounded-xl
flex
flex-col
md:flex-row
gap-4
md:gap-0
md:justify-between
md:items-center
  "

  >

  <div className="flex-1">

<p className="
font-semibold
text-lg
break-words
">
{paper.name}
</p>

<p className="
text-gray-400
text-sm
mt-1
break-words
">
{paper.chapters.join(", ")}
</p>

</div>


  <div className="flex
flex-col
sm:flex-row
gap-2
w-full
md:w-auto">

  <button

onClick={()=>{

if(

paper.isLocked

){

setSelectedPaper(
paper
)

setShowCodeModal(
true
)

}

else{

window.open(
paper.pdf,
"_blank"
)

}

}}

className="
bg-blue-500
hover:bg-blue-600
px-4
py-2
rounded-lg
text-center
w-full
sm:w-auto
"

>

Open PDF

</button>


  <button

onClick={()=>{

if(paper.isLocked){

setSelectedPaper(paper)

setShowCodeModal(true)

}

else{

window.open(
`${paper.pdf}?fl_attachment=${paper.originalFileName}`,
"_blank"
)

}

}}

className="
bg-green-500
hover:bg-green-600
px-4
py-2
rounded-lg
text-center
w-full
sm:w-auto
"

>

Download

</button>

  </div>

  </div>

  )

  )

  )

  }

  </div>

    

        </div>

        {/* ===================== */}
        {/* 📗 MODEL PAPERS */}
        {/* ===================== */}

        <div>

          <h2 className="text-xl mb-4 text-green-400">
            📗 Model Papers
          </h2>

          {materials.flatMap(

  student=>

  student.materials
  ?.filter(

  m=>

  m.type==="model"

  )

  ).length===0 && (

  <p className="text-gray-400">

  No model papers uploaded

  </p>

  )}



  <div className="grid md:grid-cols-2 gap-4">

  {

  materials.flatMap(

  student=>

  student.materials

  ?.filter(

  m=>

  m.type==="model"

  )

  .map(

  paper=>(

  <div
  key={paper._id}

  className="
  bg-white/10
p-4
rounded-xl
flex
flex-col
md:flex-row
gap-4
md:gap-0
md:justify-between
md:items-center
  "

  >

  <div className="flex-1">

<p className="
font-semibold
text-lg
break-words
">
{paper.name}
</p>

<p className="
text-gray-400
text-sm
mt-1
break-words
">
{paper.chapters.join(", ")}
</p>

</div>


  <div className="flex
flex-col
sm:flex-row
gap-2
w-full
md:w-auto">

  <a

  href={paper.pdf}

  target="_blank"

  className="
  bg-blue-500
hover:bg-blue-600
px-4
py-2
rounded-lg
text-center
w-full
sm:w-auto
  "

  >

  Open PDF

  </a>


 <button

onClick={()=>{

window.open(

`${paper.pdf}?fl_attachment=${paper.originalFileName}`,

"_blank"

)

}}

className="
bg-green-500
hover:bg-green-600
px-4
py-2
rounded-lg
text-center
w-full
sm:w-auto
"

>

Download

</button>

  </div>

  </div>

  )

  )

  )

  }

  </div>

      </div>


      {

showCodeModal && (

<div
className="
fixed
inset-0
bg-black/70
flex
items-center
justify-center
z-50
"
>

<div
className="
bg-[#0f172a]
border
border-white/10
shadow-2xl
rounded-3xl
p-8
w-[360px]
backdrop-blur-xl
"
>

<h2
className="
text-2xl
font-bold
mb-2
text-center
"
>

🔒 Protected Paper

</h2>

<p
className="
text-sm
text-gray-400
text-center
mb-6
"
>

Ask your teacher for access code

</p>


<input

type="text"

value={enteredCode}

onChange={(e)=>

setEnteredCode(
e.target.value
)

}

placeholder="
Enter secret code
"

className="
w-full
bg-white/10
border
border-white/20
rounded-xl
px-4
py-3
text-white
placeholder-gray-400
outline-none
focus:border-blue-500
mb-4
"

/>


<button

onClick={()=>{

if(

enteredCode

===

selectedPaper.accessCode

){

window.open(

selectedPaper.pdf,

"_blank"

)

setShowCodeModal(
false
)

setEnteredCode(
""
)

}

else{

toast.error(
"Wrong code"
)

}

}}

className="
bg-green-500
hover:bg-green-600
py-3
rounded-xl
font-semibold
w-full
"

>

Unlock

</button>


<button

onClick={()=>{

setShowCodeModal(
false
)

}}

className="
mt-3
text-sm
text-gray-400
w-full
"

>

Cancel

</button>

</div>

</div>

)

}

      </div>

    )

  }


  export default Material