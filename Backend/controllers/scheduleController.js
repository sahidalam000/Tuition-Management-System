import Schedule
from "../models/Schedule.js"


// ADD EXAM

export const addExam =
async(req,res)=>{

try{

const {

course,
assignedClass,

name,
date,
chapters

}

=

req.body


let schedule =

await Schedule.findOne({

course,
assignedClass

})


if(!schedule){

schedule =
await Schedule.create({

course,
assignedClass,

exams:[],
timings:[]

})

}


schedule.exams.push({

name,

date,

chapters:
chapters
.split(",")
.map(
c=>c.trim()
)

})

await schedule.save()

res.json({

message:
"Exam added"

})

}catch(err){

res.status(500).json({

message:
err.message

})

}

}



// ADD TIMING

export const addTiming =
async(req,res)=>{

try{

const {

course,
assignedClass,

days,
time

}

=

req.body


let schedule =

await Schedule.findOne({

course,
assignedClass

})


if(!schedule){

schedule =
await Schedule.create({

course,
assignedClass,

exams:[],
timings:[]

})

}


schedule.timings.push({

days,
time

})

await schedule.save()

res.json({

message:
"Timing added"

})

}catch(err){

res.status(500).json({

message:
err.message

})

}

}



// GET SCHEDULE

export const getSchedule =
async(req,res)=>{

try{

const {

course,
assignedClass

}

=

req.params


const schedule =
await Schedule.findOne({

course,
assignedClass

})


res.json(

schedule ||

{

exams:[],
timings:[]

}

)

}catch(err){

res.status(500).json({

message:
err.message

})

}

}

// DELETE EXAM

export const deleteExam =
async(req,res)=>{

try{

const {
course,
assignedClass,
examId
}
=
req.params


const schedule =
await Schedule.findOne({

course,
assignedClass

})

if(!schedule){

return res.status(404)
.json({

message:
"Schedule not found"

})

}


schedule.exams =
schedule.exams.filter(

exam=>

String(exam._id)

!==

String(examId)

)

await schedule.save()

res.json({

message:
"Exam deleted"

})

}catch(err){

res.status(500)
.json({

message:
err.message

})

}

}



// DELETE TIMING

export const deleteTiming =
async(req,res)=>{

try{

const {

course,
assignedClass,
timingId

}

=

req.params


const schedule =
await Schedule.findOne({

course,
assignedClass

})

if(!schedule){

return res.status(404)
.json({

message:
"Schedule not found"

})

}


schedule.timings =
schedule.timings.filter(

t=>

String(t._id)

!==

String(timingId)

)

await schedule.save()

res.json({

message:
"Timing deleted"

})

}catch(err){

res.status(500)
.json({

message:
err.message

})

}

}

export const getAllSchedules =
async(req,res)=>{

try{

const schedules =
await Schedule.find()

res.json(
schedules
)

}catch(err){

res.status(500)
.json({

message:
err.message

})

}

}

