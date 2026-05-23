import mongoose from "mongoose";


const enrolledCourseSchema = new mongoose.Schema({

  course: {
    type: String,
    enum: ["math", "science"],
  },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },

  assignedClass: {
    type: String,
    default: "",
  },

  joinDate: {
    type: Date,
  },

  paidTill: {
    type: Date,
    default: null,
  },

  lastPaidDate: {
    type: Date,
    default: null,
  },

 // ==========================
// 🎯 PERFORMANCE / MARKS
// ==========================
marks:[
{

test:{
type:String,
default:""
},

marks:{
type:Number,
default:0
},

outOf:{
type:Number,
default:0
},

chapters:[
String
],

date:{
type:Date,
default:Date.now
}

}
],

// MATERIAL PAGE

materials:[

{

type:{
type:String,
enum:["exam","model"]
},

name:String,

pdf:String,

originalFileName:{
type:String,
default:""
},

chapters:[String],

isLocked:{
type:Boolean,
default:false
},

accessCode:{
type:String,
default:""
},

date:{
type:Date,
default:Date.now
}

}

],


});


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    phone: {
      type: String,
      default: "",
    },
    
     profileImage: {
      type: String,
      default: "",
    },

    enrolledCourses: [enrolledCourseSchema],

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;