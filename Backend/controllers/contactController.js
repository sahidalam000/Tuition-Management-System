import Contact from "../models/Contact.js"

export const sendMessage =
async(req,res)=>{

try{

const {

name,
studentClass,
message

}

=
req.body


if(
!name ||
!studentClass ||
!message
){

return res.status(400)
.json({

message:
"Fill all fields"

})

}


const newMessage =
new Contact({

name,
studentClass,
message

})

await newMessage.save()

res.status(201)
.json({

message:
"Message sent"

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