import express from "express";

import protect from "../middleware/authMiddleware.js";

import adminOnly from "../middleware/roleMiddleware.js";

import upload from "../middleware/uploadMiddleware.js"

import {
  getPendingEnrollments,
  approveEnrollment,
  getApprovedStudents,
  updateStudent,
  removeStudent,
  addMarks,
  addMaterial,
  deleteMaterial,
} from "../controllers/adminController.js";



const router = express.Router();

// ADMIN DASHBOARD
router.get(
  "/dashboard",
  protect,
  adminOnly,
  (req, res) => {

    res.json({
      message: "Welcome Admin",
    });
  }
);


// GET PENDING ENROLLMENTS
router.get(
  "/pending-enrollments",
  protect,
  adminOnly,
  getPendingEnrollments
);

router.get(
  "/approved-students",
  protect,
  
  getApprovedStudents
)


// APPROVE ENROLLMENT
router.put(
  "/approve/:userId/:courseName",
  protect,
  adminOnly,
  approveEnrollment
);


router.put(
"/update-student/:id",
protect,
adminOnly,
updateStudent
)

router.put(

"/add-marks/:id/:course",

protect,
adminOnly,

addMarks

)

router.put(

"/add-material/:id",

protect,
adminOnly,

upload.single("pdf"),

addMaterial

)

router.delete(
"/remove-student/:id",

protect,
adminOnly,

removeStudent
)

router.delete(

"/delete-material/:studentId/:course/:materialId",

protect,
adminOnly,

deleteMaterial

)



export default router;