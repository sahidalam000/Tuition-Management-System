import React from "react"
import BackButton from "../components/BackButton"

const PrivacyPolicy = () => {

return (

<div className="
min-h-screen
bg-[#020617]
text-white
px-6
py-12
">

<BackButton to="/" />

<h1 className="
text-4xl
font-bold
mb-8
">

Privacy Policy

</h1>


<div className="
space-y-6
text-gray-300
leading-8
">

<p>

We collect student information such as
name, email, profile image and
enrollment details for educational
purposes only.

</p>


<p>

Your data is used to:

• Login authentication  
• Enrollment approval  
• Study materials  
• Exam performance tracking  

</p>


<p>

BrightFuture does not sell or share
student information with third parties.

</p>


<p>

Students may contact us regarding
data correction or account removal.

</p>


<p>

Contact:

brightfuture@gmail.com

</p>

</div>

</div>

)

}

export default PrivacyPolicy