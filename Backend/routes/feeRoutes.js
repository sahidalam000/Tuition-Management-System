import express from "express"
import upload
from "../middleware/feeUpload.js"

import protect
from "../middleware/authMiddleware.js"

import adminOnly
from "../middleware/roleMiddleware.js"

import {

saveFee,
getFees,
deleteFee

}

from "../controllers/feeController.js"


const router =
express.Router()


router.post(

"/save",

protect,
adminOnly,

upload.single(
"image"
),

saveFee

)

router.get(

"/all",

getFees

)


router.delete(

"/delete/:id",

protect,
adminOnly,

deleteFee

)

export default router