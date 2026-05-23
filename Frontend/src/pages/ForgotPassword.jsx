import React,
{
useState
}
from "react"

import API
from "../api/axios"

import toast
from "react-hot-toast"

import {
useNavigate
}
from "react-router-dom"


const ForgotPassword =()=>{

const navigate =
useNavigate()

const [

email,
setEmail

]

=
useState("")


const [

password,
setPassword

]

=
useState("")


const [

confirm,
setConfirm

]

=
useState("")


const handleSubmit=
async(e)=>{

e.preventDefault()

if(

password
!==

confirm

){

toast.error(
"Passwords not match"
)

return

}

try{

await API.put(

"/auth/forgot-password",

{

email,

password

}

)

toast.success(

"Password updated"

)

navigate(
"/login"
)

}catch(err){

toast.error(

err.response
?.data
?.message

||

"Failed"

)

}

}


return(

<div
className="
min-h-screen
bg-[#020617]
flex
justify-center
items-center
px-4
"
>

<div
className="
bg-white/10
p-8
rounded-xl
w-full
max-w-md
text-white
"
>

<h1
className="
text-3xl
font-bold
mb-6
text-center
"
>

Forgot Password

</h1>


<form
onSubmit={
handleSubmit
}

className="
flex
flex-col
gap-4
"
>

<input

type="email"

placeholder="
Registered Email
"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

className="
px-4 py-3
rounded
bg-transparent
border
"

/>


<input

type="password"

placeholder="
New Password
"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

className="
px-4 py-3
rounded
bg-transparent
border
"

/>


<input

type="password"

placeholder="
Confirm Password
"

value={confirm}

onChange={(e)=>

setConfirm(
e.target.value
)

}

className="
px-4 py-3
rounded
bg-transparent
border
"

/>


<button

className="
bg-white
text-black
py-3
rounded
font-semibold
"

>

Reset Password

</button>

</form>

</div>

</div>

)

}

export default ForgotPassword