import express
from "express"

import protect
from "../middleware/authMiddleware.js"

import adminOnly
from "../middleware/roleMiddleware.js"

import {

addExam,
addTiming,
getSchedule,
deleteExam,
deleteTiming,
getAllSchedules

}

from "../controllers/scheduleController.js"

const router =
express.Router()


router.post(

"/add-exam",

protect,
adminOnly,

addExam

)


router.post(

"/add-timing",

protect,
adminOnly,

addTiming

)


router.get(

"/:course/:assignedClass",

protect,

getSchedule

)

router.get(

"/all",

protect,
adminOnly,

getAllSchedules

)


router.delete(

"/delete-exam/:course/:assignedClass/:examId",

protect,
adminOnly,

deleteExam

)


router.delete(

"/delete-timing/:course/:assignedClass/:timingId",

protect,
adminOnly,

deleteTiming

)

export default router