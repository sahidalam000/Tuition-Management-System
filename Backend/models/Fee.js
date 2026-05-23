import mongoose from "mongoose"

const feeSchema = new mongoose.Schema({

course:{
type:String,
required:true
},

assignedClass:{
type:String,
required:true
},

regularFee:Number,

originalFee:Number,

comboDiscount:Number,

image:String,

features:[String]

},
{
timestamps:true
})

export default mongoose.model(
"Fee",
feeSchema
)