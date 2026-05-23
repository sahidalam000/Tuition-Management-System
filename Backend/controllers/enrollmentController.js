import User from "../models/User.js";


// ENROLL REQUEST
export const requestEnrollment = async (req, res) => {

  try {

    const { course, profileImage } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }


    // CHECK ALREADY ENROLLED
    const alreadyExists =
      user.enrolledCourses.find(
        (c) => c.course === course
      );

    if (alreadyExists) {

      return res.status(400).json({
        message: "Already applied for this course",
      });
    }


    // SAVE IMAGE
    user.profileImage = profileImage;


    // ADD COURSE
    user.enrolledCourses.push({
      course,
      status: "pending",
    });


    await user.save();


    res.status(200).json({
      message: "Enrollment request sent successfully",
      enrolledCourses: user.enrolledCourses,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


export const getMyEnrollments = async (
  req,
  res
) => {

  try {

    // 🔥 ALWAYS FRESH USER FROM DB
    const user = await User.findById(
      req.user._id
    )

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      })
    }

    res.json({
  enrolledCourses:
    user.enrolledCourses || [],

  user,
})

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}