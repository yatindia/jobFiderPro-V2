//*Imports
require("dotenv/config")
const express = require("express")
const multer = require("multer")
const uuid = require("uuid").v4
const fs = require("fs")
const User = require("../models/User")
const UserProfile = require("../models/UserProfile")
const EmployerProfile = require("../models/EmployerProfile")
const config = require("../config")
const profile = express()
const {verifyToken, checkEmpty} = require("../functions");


profile.use("/profileImages", express.static("profileImages"))
profile.use("/profileResumes", express.static("profileResumes"))
profile.use(verifyToken)

//*--------------------MiddleWare--------------------//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.profileDirectory)
  },
  filename: (req, file, cb) => {
    const {
      originalname
    } = file

    let finalName = () => {
      // let ext = originalname.split(".")
      return `${uuid()}.jpg`
    }

    let file_name = finalName()
    req.body.customFileUploadName = file_name

    cb(null, file_name)
  },
})

const storageResume = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.resumeDirectory)
  },
  filename: (req, file, cb) => {
    const {
      originalname
    } = file

    let finalName = () => {
      let ext = originalname.split(".")
      return `${uuid()}.${ext[ext.length - 1]}`
    }

    let file_name = finalName()
    req.body.customResumeUploadName = file_name

    cb(null, file_name)
  },
})

const upload = multer({storage:storage})
const uploadResume = multer({storage:storageResume})

//*--------------------Routes--------------------//


//*--------------------UPDATE DP--------------------//
profile.post("/updatedp", upload.single("profile"), (req, res) => {
  let value = req.body.customFileUploadName
  let oldDp = req.body.oldDp

  try {

    fs.unlink(`${config.profileDirectory}${oldDp}`, (err) => {

      if (value) {
        //* S-Response
        res.json({
          uploadStatus: true,
          message: "File Uploaded Successfully",
          fileName: value,
          backError: err

        })
      } else {
        //* E-Response
        res.json({
          uploadStatus: false,
          message: "File Uploaded Failed",
          fileName: "",
          backError: err

        })
      }
    });

  } catch (error) {
    res.json({
      error,
    })
  }
})

//*--------------------UPDATE RESUME--------------------//
profile.post("/updateresume", uploadResume.single("resume"), (req, res) => {
  let value = req.body.customResumeUploadName
  let oldResume = req.body.oldResume

  try {

    fs.unlink(`${config.resumeDirectory}${oldResume}`, (err) => {

      if (value) {
        //* S-Response
        res.json({
          uploadStatus: true,
          message: "File Uploaded Successfully",
          fileName: value,

        })
      } else {
        //* E-Response
        res.json({
          uploadStatus: false,
          message: "File Uploaded Failed",
          fileName: "",

        })
      }
    });

  } catch (error) {
    res.json({
      error,
    })
  }
})


//*--------------------PART 1 PROFILE UPDATE--------------------//
profile.post("/updateprofile1", async (req, res) => {
  const emailCheck = (await User.findOne({
    email: req.body.email
  })) || false

  if (emailCheck.accountConfirmed == true && emailCheck.type == req.body.type) {

    let updateUser1 = await User.updateOne({
      email: req.body.email
    }, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        profileImage: req.body.profileImage,
      }
    })

    //* S-Response
    res.json({
      error: true,
      status: `Profile Updated`,
    })
  } else {

    //* E-Response
    res.json({
      error: false,
      status: `Profile Updation failed`,
    })
  }
})


//*--------------------PROFILE PASSWORD  UPDATE--------------------//
profile.post("/updatepassword", async (req, res) => {
  const emailCheck = (await User.findById(req.body.authorization._id)) || false

  if (emailCheck.accountConfirmed == true && emailCheck.type == req.body.type) {

    if (emailCheck.password != req.body.oldPassword) {
      return res.json({
        error: false,
        status: `Old Password doesn't match`,
      })
    }

    let updateUser1 = await User.updateOne({
      email: req.body.email
    }, {
      $set: {
        password: req.body.password
      }
    })

    //* S-Response
    res.json({
      error: true,
      status: `Profile Password Updated`,
    })


  } else {

    //* E-Response
    res.json({
      error: false,
      status: `Profile Password Updation failed`,
    })
  }
})


//*--------------------PART 2 ***USER*** PROFILE UPDATE--------------------//
profile.post("/updateprofile2", async (req, res) => {

    const emailCheck = await User.findById(req.body.authorization._id)
    let response = {
      error: false,
      message: `Profile Updation failed`,
    }

    if (emailCheck.accountConfirmed == true && emailCheck.type == req.body.authorization.type) {

    if (emailCheck.type == "seeker") {

      await UserProfile.findOneAndUpdate(
        {link_id:req.body.authorization._id },
        {
          $set: {
            email: req.body.authorization.email,
            mobile: req.body.mobile,
            dateOfBirth: req.body.dateOfBirth,
            jobTitle: req.body.jobTitle,
            pastJobs: req.body.pastJobs,
            gender: req.body.gender,
            qualifications: req.body.qualifications,
            techQualifications : req.body.techQualifications,
            state: req.body.state,
            city: req.body.city,
            resume: "nores"
          }
      })
    } else if (emailCheck.type == "employer") {
      await EmployerProfile.findOneAndUpdate( 
        {link_id:req.body.authorization._id },
      {
        $set: {
          orgLogo: "profile.png",
          orgName: req.body.orgName,
          orgEmail: req.body.authorization.email,
          orgPhone: req.body.orgPhone,
          orgAddress: req.body.orgAddress,
          orgWebsite: req.body.orgWebsite,
          orgCountry: req.body.orgCountry,
          pan: req.body.pan,
          gstin: req.body.gstin
        }
      })
    }

    //* S-Response
    response = {
      error: true,
      message: `Profile Updated`,
    }

  } else {

    //* E-Response
    response = {
      error: false,
      message: `Profile Updation failed`,
    }
  }

  res.json(response)

})

profile.post("/getprofile", async (req, res) => {

  try {
    const emailCheck = await User.findById(req.body.authorization._id)
 
    if (emailCheck.accountConfirmed == true && emailCheck.type == req.body.authorization.type) {
      if (emailCheck.type == "seeker") {

        const uprofile = (await UserProfile.findOne({
          link_id: req.body.authorization._id
        })) || false

        

        if (uprofile == false) {
          return res.json({
            error: true,
            message: "please complete the signup part 2",
            data: {part1:emailCheck}
          })
        }

        return res.json({
          error: false,
          status: "success",
          data: {
            part1: emailCheck,
            part2: uprofile
          }
        })

      } else if (emailCheck.type == "employer") {

        const eprofile = (await EmployerProfile.findOne({
          link_id: req.body.authorization._id
        })) || false

        

        if (eprofile == false) {
          return res.json({
            error: true,
            message: "please complete the signup part 2.0",
            data: {part1:emailCheck}
          })
        }


        return res.json({
          error: false,
          status: "success",
          data: {
            part1: emailCheck,
            part2: eprofile
          }
        })
      } else {
        return res.json({
          error: true,
          status: "failed",
          data: {}
        })
      }
    } else {
      return res.json({
        error: true,
        status: "Account matching the type Cannot be found",
        data: {}
      })

    }
  } catch (error) {
    return res.json({
      error: true,
      status: "Account matching the type Cannot be found",
      backError: error,
      data: {}
    })
  }

});

profile.post("/getseekerprofile", async (req, res) => {

  try {
    const emailCheck = (await User.findById({
      _id: req.body.seekerid
    })) || false

    if (emailCheck.type == "seeker") {

      const uprofile = (await UserProfile.findOne({
        link_id: emailCheck._id
      })) || false

      return res.json({
        error: false,
        status: "success",
        data: {
          part1: emailCheck,
          part2: uprofile
        }
      })

    }  else {
      return res.json({
        error: true,
        status: "failed",
        data: {}
      })
    }

  } catch (error) {
    return res.json({
      error: true,
      status: "Account matching the type Cannot be found",
      backError: error,
      data: []
    })
  }

});

//*--------------------SIGN UP PART 2--------------------//
profile.post("/signupcomplete", async (req, res) => {

  let userCheck = await User.findById(req.body.authorization._id);

  let response = {
    error: true,
    message: "Somthing went wrong"
  }

  try {

    if (userCheck === null) {
      throw new Error("An account with this email does not exist")
    }

    if (userCheck.type == "seeker" && req.body.authorization.type == "seeker") {

      let seekerInfo = {
        link_id: req.body.authorization._id,
        email: req.body.authorization.email,
        mobile: req.body.mobile,
        dateOfBirth: req.body.dateOfBirth,
        jobTitle: req.body.jobTitle,
        pastJobs: req.body.pastJobs,
        gender: req.body.gender,
        qualifications: req.body.qualifications,
        techQualifications: req.body.techQualifications,
        state: req.body.state,
        city: req.body.city,
        resume: "nores",
        accountConfirmed: true
      }
      let checkError = checkEmpty(seekerInfo);
  
      if (!checkError.error) {
        
        let createUser = await UserProfile(seekerInfo)
        createUser.save()
          .then(result => {
            //* S-Response
            response = {
              error: false,
              message: "Profile Updated Successfully",
            }
          }).catch((err) => {
            //* E-Response
            response = {
              error: true,
              message: "Could create user at the moment",
              backError: err
            }
          })
      }
    }
 
    if (userCheck.type == "employer" && req.body.authorization.type == "employer") {
  
      let empInfo = {
        accountConfirmed: true,
        link_id: req.body.authorization._id,
        email: userCheck.email,
        orgLogo: "logo.png",
        orgName: req.body.orgName,
        orgEmail: "nomail",
        orgPhone: req.body.orgPhone,
        orgAddress: req.body.orgAddress,
        orgWebsite: req.body.orgWebsite,
        orgCountry: req.body.orgCountry,
        pan: req.body.pan,
        gstin: req.body.gstin
      }
      let checkError = checkEmpty(empInfo);
     
  
      if (!checkError.error) {
        let createUser = await EmployerProfile(empInfo)
        createUser.save()
          .then(result => {
            //* S-Response
            response = {
              ...response,
              error: false,
              message: "Profile Updated Successfully"
            }
          }).catch((err) => {
            //* E-Response
            
            console.log(err);
          })
      }
    }

    
  } catch (error) {

    

    response = {
      ...response,
      error : true,
      message: error.message
    }
    
  }

  res.json(response)

 




})

module.exports = profile