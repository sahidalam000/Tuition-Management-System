import mongoose from "mongoose"

const scheduleSchema =
new mongoose.Schema({

course:{
type:String,
required:true
},

assignedClass:{
type:String,
required:true
},

exams:[

{

name:String,

date:Date,

chapters:[String]

}

],

timings:[

{

days:String,

time:String

}

]

},

{
timestamps:true
}

)

export default mongoose.model(
"Schedule",
scheduleSchema
)