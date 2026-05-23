import express from "express";


import protect from "../middleware/authMiddleware.js";

import User from "../models/User.js";

import {
  requestEnrollment,
  getMyEnrollments,
} from "../controllers/enrollmentController.js";


const router = express.Router();


// ENROLL REQUEST
router.post(
  "/request",
  protect,
  requestEnrollment
);

// GET MY ENROLLMENTS
router.get(
  "/my-enrollments",
  protect,
  getMyEnrollments
);


router.get(
  "/approved-students/:course",
  protect,
  async (req, res) => {

    try {

      const users = await User.find({
        enrolledCourses: {
          $elemMatch: {
            course: req.params.course,
            status: "approved",
          },
        },
      })

      const students = users.map((user) => {

        const courseData =
user.enrolledCourses.find(
 (c)=>
 c.course===req.params.course &&
 c.status==="approved"
)



        return {
 _id:user._id,
 name:user.name,
 profileImage:user.profileImage,
 assignedClass:
 courseData?.assignedClass || "",

 joinDate: courseData?.joinDate,
 paidTill: courseData?.paidTill,
 lastPaidDate: courseData?.lastPaidDate
}

      })
console.log(students)
      res.json(students)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message: "Server Error",
      })

    }

  }
)

export default router;