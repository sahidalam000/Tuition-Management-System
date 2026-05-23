import User from "../models/User.js";
// import fs from "fs"


// GET ALL PENDING ENROLLMENTS
export const getPendingEnrollments = async (req, res) => {

  try {

    const users = await User.find({
      "enrolledCourses.status": "pending",
    }).select("-password");


    const pendingStudents = [];


    users.forEach((user) => {

      user.enrolledCourses.forEach((course) => {

        if (course.status === "pending") {

          pendingStudents.push({
            userId: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            course: course.course,
            status: course.status,
          });
        }
      });
    });


    res.status(200).json(pendingStudents);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// APPROVE ENROLLMENT
export const approveEnrollment = async (
  req,
  res
) => {

  try {

    const { userId, courseName } = req.params

    const { assignedClass } = req.body

    console.log(
"Received Class:",
assignedClass
)

    const user = await User.findById(userId)

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      })
    }

    const course =
      user.enrolledCourses.find(
        (c) => c.course === courseName
      )

    if (!course) {

      return res.status(404).json({
        message: "Enrollment not found",
      })
    }

    // ✅ UPDATE
    course.status =
"approved"

course.assignedClass =
String(assignedClass)

course.joinDate =
new Date()

await user.save()

    res.json({
      message: "Enrollment approved",
    })

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getApprovedStudents = async (req, res) => {

  try {

    const users = await User.find({
      role:"student",
      "enrolledCourses.status": "approved",
    }).select("-password")

    const formattedStudents = []

    users.forEach((user) => {

      user.enrolledCourses.forEach((course) => {

        if (course.status === "approved") {

          formattedStudents.push({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,

            course: course.course,
            assignedClass: course.assignedClass,

            joinDate: course.joinDate,
            paidTill: course.paidTill,
            lastPaidDate: course.lastPaidDate,

            marks:
            course.marks || [],

            materials:
            course.materials || []
          })
        }
      })
    })

    res.status(200).json(formattedStudents)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}


export const updateStudent =
async(req,res)=>{

try{

const {
joinDate,
paidTill,
lastPaidDate
}
=
req.body

const user=
await User.findById(
req.params.id
)

if(!user)
return res.status(404).json({
message:"User not found"
})

user.enrolledCourses.forEach(
course=>{

if(joinDate)
course.joinDate=joinDate

if(paidTill)
course.paidTill=paidTill

if(lastPaidDate)
course.lastPaidDate=
lastPaidDate

}
)

await user.save()

res.json({
message:"Updated"
})

}catch(err){

res.status(500).json({
message:err.message
})

}

}


export const removeStudent =
async(req,res)=>{

try{

const user =
await User.findById(
req.params.id
)

if(!user){

return res.status(404)
.json({
message:
"User not found"
})

}

user.enrolledCourses =
user.enrolledCourses.filter(

course=>

course.status !==
"approved"

)

await user.save()

res.json({

message:
"Student removed"

})

}catch(err){

res.status(500)
.json({

message:
err.message

})

}

}


export const addMarks =
async(req,res)=>{

try{

const {
test,
marks,
outOf,
chapters
}
=
req.body

const {
id,
course
}
=
req.params


const user =
await User.findById(id)

if(!user){

return res.status(404)
.json({
message:
"User not found"
})

}


const enrolled =
user.enrolledCourses
.find(

c=>
c.course===course

)

if(!enrolled){

return res.status(404)
.json({

message:
"Course not found"

})

}


enrolled.marks.push({

test,
marks,
outOf,

chapters:
chapters
.split(",")
.map(
c=>c.trim()
)

})


await user.save()


res.json({

message:
"Marks Added"

})

}catch(err){

res.status(500)
.json({

message:
err.message

})

}

}


export const addMaterial =
async(req,res)=>{

try{

console.log(
"FILE:",
req.file
)

console.log(
"BODY:",
req.body
)

const {

type,
name,
chapters,
course,
isLocked,
accessCode

}
=
req.body


const user =
await User.findById(
req.params.id
)

if(!user){

return res.status(404)
.json({

message:
"User not found"

})

}


const enrolled =
user.enrolledCourses.find(

c=>

c.course===course

)

if(!enrolled){

return res.status(404)
.json({

message:
"Course not found"

})

}


let pdfUrl=""
let originalFileName=""

if(req.file){

pdfUrl =
req.file.path

originalFileName =
req.file.originalname

}

enrolled.materials.push({

type,
name,

pdf: pdfUrl,

originalFileName:
originalFileName,

chapters:
JSON.parse(chapters),

isLocked:
isLocked==="true",

accessCode:
accessCode || ""

})


await user.save()

res.json({

message:
"Material Uploaded"

})

}catch(err){

console.log(
err
)

res.status(500)
.json({

message:
err.message

})

}

}


export const deleteMaterial =
async(req,res)=>{

try{

const {
studentId,
course,
materialId
}
=
req.params


const user =
await User.findById(
studentId
)

if(!user){

return res.status(404)
.json({

message:
"User not found"

})

}


const enrolled =
user.enrolledCourses.find(

c=>

c.course===course

)

if(!enrolled){

return res.status(404)
.json({

message:
"Course not found"

})

}


/*
ONLY REMOVE FROM DATABASE
NO fs.unlinkSync
NO local file delete
*/

enrolled.materials =

enrolled.materials.filter(

m=>

String(m._id)

!==

String(materialId)

)


await user.save()

res.json({

message:
"Deleted"

})

}catch(err){

res.status(500)
.json({

message:
err.message

})

}

}