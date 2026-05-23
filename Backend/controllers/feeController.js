import Fee from "../models/Fee.js"


// ADD / UPDATE

export const saveFee =
async(req,res)=>{

try{

const {

course,
assignedClass,

regularFee,
originalFee,

comboDiscount,

features

}
=
req.body

let imageUrl = ""

if(req.file){

imageUrl =
req.file.path

}

let fee =
await Fee.findOne({

course,
assignedClass

})


if(fee){

fee.regularFee=
regularFee

fee.originalFee=
originalFee

fee.comboDiscount=
comboDiscount

fee.features =
JSON.parse(features)

if(imageUrl){

fee.image =
imageUrl

}

await fee.save()

}
else{

fee =
await Fee.create({

course,
assignedClass,

regularFee,
originalFee,

comboDiscount,

features:
JSON.parse(features),

image:
imageUrl

})

}


res.json({

message:
"Fee saved",

fee

})

}catch(err){
    console.log(err)

res.status(500)
.json({

message:
err.message

})

}

}



// GET ALL

export const getFees =
async(req,res)=>{

try{

const fees =
await Fee.find()

res.json(fees)

}catch(err){

res.status(500)
.json({

message:
err.message

})

}

}



// DELETE

export const deleteFee =
async(req,res)=>{

try{

await Fee.findByIdAndDelete(
req.params.id
)

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