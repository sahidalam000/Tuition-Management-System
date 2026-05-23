import multer from "multer"
import { CloudinaryStorage }
from "multer-storage-cloudinary"

import cloudinary
from "../config/cloudinary.js"


const storage =
new CloudinaryStorage({

cloudinary,

params: async(req,file)=>({

folder:
"brightfuture-materials",

resource_type:
"auto",

use_filename:true,

unique_filename:false,

public_id:
file.originalname

})

})


const upload =
multer({

storage,

fileFilter:
(req,file,cb)=>{

if(

file.mimetype ===
"application/pdf"

){

cb(null,true)

}

else{

cb(
new Error(
"Only PDF allowed"
),
false
)

}

}

})

export default upload