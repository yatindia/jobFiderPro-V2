//*Imports
require("dotenv/config")
const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const UserProfile = require("../models/UserProfile")
const EmployerProfile = require("../models/EmployerProfile")
const Job = require("../models/Job")
const nodemailer = require("nodemailer")
const ejs = require("ejs")
const config = require("../config")
const job = express()
const mongoose = require("mongoose")
const {
  checkEmpty,
  verifyToken
} = require("../functions");

job.use(verifyToken)

//*--------------------CREATE JOB--------------------//
job.post("/create", async (req, res) => {

  let checkEmployer = await User.findById(req.body.authorization._id) 

  let checkJobs = await Job.find({
    link_id: req.body.authorization._id
  }).countDocuments()
  if (checkJobs > 6) {
    return res.json({
      error: true,
      message: "Job Creation Failed, Maximum Post Reached"
    })
  }


  if (checkEmployer != false) {
    if (checkEmployer.type != "employer") {
      return res.json({
        error: true,
        message: "You are not authorised to create job"
      })
    }
  } else {
    return res.json({
      error: true,
      message: "Could find authorisation to create job from your account"
    })
  }

  let jobCreateDetails = await checkEmpty({
    link_id: req.body.authorization._id,
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription,
    jobCity: req.body.jobCity,
    jobSalary: req.body.jobSalary,
    jobRequirement: req.body.jobRequirement,
    jobType: req.body.jobType,
    jobApplyEnd: req.body.jobApplyEnd,
    jobCategory: req.body.jobCategory,
    jobSubCategory: req.body.jobSubCategory
  })

  if (jobCreateDetails.error == false) {

    let createJob = await Job({
      link_id: req.body.authorization._id,
      jobTitle: req.body.jobTitle,
      jobDescription: req.body.jobDescription,
      jobCity: req.body.jobCity,
      jobSalary: req.body.jobSalary,
      jobRequirement: req.body.jobRequirement,
      jobType: req.body.jobType,
      jobApplyEnd: req.body.jobApplyEnd,
      jobCategory: req.body.jobCategory,
      jobSubCategory: req.body.jobSubCategory
    })
    createJob
      .save()
      .then(response => {
        return res.json({
          error: false,
          message: "Job Created Successfully",
          backError: response
        })
      })
      .catch(err => {
        return res.json({
          error: true,
          message: "Job Creation Failed",
          backError: err
        })
      })

  }


})

//*--------------------UPDATE JOB--------------------//
//* Need TO PASS
//! authid -> Id of the employer
//! _id -> Id of the job
//! and the normal job data
job.post("/update", async (req, res) => {

  let checkEmployer = await User.findById( req.body.authorization._id) || false

  if (checkEmployer != false) {
    if (checkEmployer.type != "employer") {
      return res.json({
        error: true,
        message: "You are not authorised to update job"
      })
    }
  } else {
    return res.json({
      error: true,
      message: "Could find authorisation to update job from your account"
    })
  }

  let jobCreateDetails = await checkEmpty({
    _id: req.body._id,
    link_id: req.body.authorization._id,
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription,
    jobCity: req.body.jobCity,
    jobSalary: req.body.jobSalary,
    jobRequirement: req.body.jobRequirement,
    jobType: req.body.jobType,
    jobApplyEnd: req.body.jobApplyEnd,
    jobCategory: req.body.jobCategory,
    jobSubCategory: req.body.jobSubCategory
  })

  if (jobCreateDetails.error == false) {

    Job.findByIdAndUpdate({
        _id: req.body._id
      }, {
        $set: {
          jobTitle: req.body.jobTitle,
          jobDescription: req.body.jobDescription,
          jobCity: req.body.jobCity,
          jobSalary: req.body.jobSalary,
          jobRequirement: req.body.jobRequirement,
          jobType: req.body.jobType,
          jobApplyEnd: req.body.jobApplyEnd,
          jobCategory: req.body.jobCategory,
          jobSubCategory: req.body.jobSubCategory
        }
      }).then(response => {
        return res.json({
          error: false,
          message: "Job Updated Successfully",
          backError: response
        })
      })
      .catch(err => {
        return res.json({
          error: true,
          message: "Job Updation Failed",
          backError: err
        })
      })
  } else {
    return res.json({
      error: true,
      message: "Check for empty field",
      backError: err
    })
  }

})

//*--------------------REMOVE JOB--------------------//
//* Need TO PASS
//! authid -> Id of the employer
//! _id -> Id of the job
job.post("/removeJob", async (req, res) => {

  try {
  

    let checkJobs = await Job.findById(req.body._id) 

    if (checkJobs.link_id == req.body.authorization._id) {
      Job.remove({
        _id: req.body._id,
        link_id: req.body.authorization._id
      }, (err, result) => {
        if (err) {
          return res.json({
            error: true,
            message: "Job deletion Failed",
            backError: err
          })
        } else {
          return res.json({
            error: false,
            message: "Job deleted Successfully",
            backError: result
          })
        }

      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: "Job deletion Failed",
      backError: error
    })
  }


})



//*--------------------GET JOB--------------------//
job.post("/getjobs", async (req, res) => {

  try {
    let checkJobs = await Job.find({
      link_id: req.body.authorization._id
    }) || false
    let checkEmployer = await User.findById({
      _id: req.body.authorization._id
    }) || false

    if (checkEmployer != false && checkEmployer.type == "employer") {

      return res.json({
        error: false,
        message: "Success",
        data: checkJobs
      })

    } else {
      return res.json({
        error: true,
        message: "Could find authorisation to update job from your account"
      })
    }

  } catch (error) {
    return res.json({
      error: true,
      message: "Somthing went wrong, please check the payload",
      data: [],
      backError: error
    })
  }

})


//*--------------------GET ONE JOB--------------------//
job.post("/getsinglejob", async (req, res) => {

  try {
    let checkJobs = await Job.findOne({
      _id: req.body.jobid,
      link_id: req.body.authorization._id
    }) || false

    return res.json({
      error: false,
      message: "Success",
      data: checkJobs
    })

  } catch (error) {
    
    return res.json({
      error: true,
      message: "Somthing went wrong, please check the payload",
      data: [],
      backError: error
    })
  }
})


//*--------------------APPLY JOB--------------------//
job.post("/apply", async (req, res) => {

  try {

    let checkJobs = await Job.findById(req.body.jobid)



    if (checkJobs != false) {

      let jobId = (req.body.jobid).toString()

      await UserProfile.updateOne({
        link_id: req.body.authorization._id
      }, {
        $addToSet: {
          appliedFor: jobId
        }
      })

      await Job.findByIdAndUpdate(req.body.jobid, {
        $addToSet: {
          appliedBy: req.body.authorization._id
        }
      })

      return res.json({
        error: false,
        message: "Job application successful",
      })
    } else {
      return res.json({
        error: true,
        message: "Job application submit error"
      })
    }

  } catch (error) {

    console.log(error);

    return res.json({
      error: true,
      message: "Job application submit error2",
    })
  }
})


//*--------------------APPLY JOB--------------------//
job.post("/unapply", async (req, res) => {

  try {

    let checkJobs = await Job.findById(req.body.jobid)



    if (checkJobs != false) {

      let jobId = (req.body.jobid).toString()

      await UserProfile.updateOne({
        link_id: req.body.authorization._id
      }, {
        $pull: {
          appliedFor: jobId
        }
      })

      await Job.findByIdAndUpdate(req.body.jobid, {
        $pull: {
          appliedBy: req.body.authorization._id
        }
      })

      return res.json({
        error: false,
        message: "Job application successful removed",
      })
    } else {
     
      await UserProfile.updateOne({
        link_id: req.body.authorization._id
      }, {
        $pull: {
          appliedFor: req.body.jobid
        }
      })

      return res.json({
        error: true,
        message: "Job application removal error",
      })
    }

  } catch (error) {

    console.log(error);

    return res.json({
      error: true,
      message: "Job application removal error",
    })
  }
})


//*--------------------UNAPPLY JOB--------------------//
// job.post("/unapply", async (req, res) => {

//   try {

//     let checkJobs = await Job.findById({
//       _id: req.body.jobid
//     }) || false

//     if (checkJobs != false) {

//       let jobId = (req.body.jobid).toString()

//       await UserProfile.findOneAndUpdate({
//         link_id: req.body.authorization._id
//       }, {
//         $pull: {
//           appliedFor: jobId
//         }
//       })

//       await Job.findOneAndUpdate(req.body.jobid, {
//         $pull: {
//           appliedBy: req.body.authorization._id
//         }
//       })

//       return res.json({
//         error: false,
//         message: "Job application successful removed",
//       })
//     }

//   } catch (error) {
//     return res.json({
//       error: true,
//       message: "Job application removal error",
//       backError: error
//     })
//   }

// })


//*--------------------SEEKER SEARCH JOB--------------------//
job.post("/search", async (req, res) => {

  try {
    let skip = req.body.skip
    let limit = req.body.limit

    if (typeof limit == "undefined" || typeof skip == "undefined") {
      return res.json({
        error: true,
        message: "Please Send SKIP and LIMIT values",
      })
    }

    console.log(req.body.jobTitle);

    let searchEXP = new RegExp(`${req.body.jobTitle}`, "i")
    let searchQuery = []


    req.body.jobTitle ? searchQuery.push({jobTitle : searchEXP}): null
    req.body.jobTitle ? searchQuery.push({jobDescription  : searchEXP}): null
    req.body.jobTitle ? searchQuery.push({jobRequirement: searchEXP}): null

    
    // req.body.jobTitle ? searchQuery.jobDescription = { $regex: `${req.body.jobTitle}`, $options: "i" } : null;
    
    // req.body.jobTitle ? searchQuery.jobRequirement = { $regex: `${req.body.jobTitle}`, $options: "i" } : null;
    
    req.body.state ? searchQuery.push({state : req.body.state}) : null;
    req.body.city ? searchQuery.push({city : req.body.city}) : null;
    req.body.jobType ? searchQuery.push({jobType : req.body.jobType}) : null;
    req.body.jobCategory ? searchQuery.push({jobCategory : req.body.jobCategory }): null;
    req.body.jobSubCategory ? searchQuery.push({jobSubCategory : req.body.jobSubCategory}) : null;

    let partData = await Job.find( {$or: searchQuery}, {
      appliedBy: 0
    }).limit(limit).skip(skip)
    let count = await Job.find({$or: searchQuery}, {
      appliedBy: 0
    }).countDocuments()

    res.json({
      error: false,
      message: "Success",
      data: [
        partData,
        count
      ],
      searchQuery 
    })

  } catch (error) {
    console.log(error);
    res.json({
      error: true,
      message: "Somthing Went wrong",

    })

  }

})


//*--------------------SEEKER SEARCH SINGLE JOB--------------------//
job.post("/searchone", async (req, res) => {

  try {
    let checkJobs = await Job.findOne({
      _id: req.body.jobid
    }) || false

    let checkOrg = await EmployerProfile.findOne({
      link_id: checkJobs.link_id
    }) || false

    if (checkJobs != false && checkOrg != false) {

      return res.json({
        error: false,
        message: "Success",
        data: {
          job: checkJobs,
          org: checkOrg
        }
      })

    } else {
      return res.json({
        error: true,
        message: "Please check the Job Id parameter"
      })
    }

  } catch (error) {
    return res.json({
      error: true,
      message: "Somthing went wrong, please check the payload",
      data: [],
      backError: error
    })
  }

})



//*--------------------SEARCH SEEKER--------------------//
job.post("/searchSeeker", async (req, res) => {

  try {
    let skip = req.body.skip
    let limit = req.body.limit

    if (typeof limit == "undefined" || typeof skip == "undefined") {
      return res.json({
        error: true,
        message: "Please Send SKIP and LIMIT values",
      })
    }

    let searchQuery = {}

    req.body.jobTitle ? searchQuery.jobTitle = {
      $regex: req.body.jobTitle,
      $options: "i"
    } : searchQuery.jobTitle = {
      $regex: ".*" + "" + ".*"
    };
  
    req.body.city ? searchQuery.city = req.body.city : "";
    req.body.state ? searchQuery.state = req.body.state : "";
    req.body.techQualifications 
    ?searchQuery.techQualifications =  {$elemMatch: {skill:  {
      $regex: req.body.techQualifications,
      $options: "i"
    }}}
    : "";

   
  

    let partData = await UserProfile.find(searchQuery, {
      appliedFor: 0
    }).limit(limit).skip(skip)
    let count = await UserProfile.find(searchQuery, {
      appliedFor: 0
    }).countDocuments()

    res.json({
      error: false,
      message: "Success",
      data: [
        partData,
        count,
        searchQuery
      ]
    })

  } catch (error) {
    res.json({
      error: true,
      message: "Somthing Went wrong",

    })

  }

})

//*--------------------SEARCH SEEKER SINGLE--------------------//
job.post("/searchoneseeker", async (req, res) => {

  try {
    let checkJobs = await UserProfile.findOne({
      link_id: req.body.authorization._id
    }) || false
    let checkJobs2 = await User.findOne({
      _id: req.body.authorization._id
    }) || false

    if (checkJobs != false && checkJobs2 != false) {

      return res.json({
        error: false,
        message: "Success",
        data: {
          part1: checkJobs,
          part2: checkJobs2
        }
      })

    } else {
      return res.json({
        error: true,
        message: "Please check the Job Id parameter"
      })
    }

  } catch (error) {
    return res.json({
      error: true,
      message: "Somthing went wrong, please check the payload",
      data: [],
      backError: error
    })
  }

})

job.post("/seeker", async (req, res) => {

  try {
    let checkSeeker = await UserProfile.findOne({
      link_id: req.body._id}) || false
    let checkSeeker2 = await User.findById(req.body._id, {password: 0}) || false


    if (checkSeeker != false && checkSeeker2 != false) {

      return res.json({
        error: false,
        message: "Success",
        data: {
          part1: checkSeeker,
          part2: checkSeeker2
        }
      })

    } else {
      return res.json({
        error: true,
        message: "Please check the Job Id parameter"
      })
    }

  } catch (error) {
    return res.json({
      error: true,
      message: "Somthing went wrong, please check the payload",
      data: [],
      backError: error
    })
  }

})


//*--------------------TAKE SEEKER profile--------------------//
job.post("/takeresume", async (req, res) => {


  let employer = await User.findById({
    _id:mongoose.Types.ObjectId(req.body.link_id)
  }) || false
  let candidate = await User.findById({
    _id: mongoose.Types.ObjectId(req.body.seekerid)
  }) || false

  console.log("BLock 1" + employer, candidate);



  try {
  
    if (employer.type == "employer" && candidate.type == "seeker") {
   
      let employerProfile = await EmployerProfile.findOne({
        link_id: employer._id
      })

      let checkExixting = await EmployerProfile.findOne({
        downloadedResumes: {
          $in : [req.body.seekerid]
        }
      }).countDocuments()

      if (checkExixting == 0) {

        if (employerProfile.resumePoints > 0) {
    
          let newPoints = (employerProfile.resumePoints - 1);
          console.log(newPoints);
          await employerProfile.updateOne({  resumePoints: newPoints  })
          await employerProfile.updateOne({
           
            $addToSet: {
              downloadedResumes: req.body.seekerid
            }
          })


        } else {
          return res.json({
            error: true,
            message: "Please Recharge your points",
          })
        }
      } else {
        return res.json({
          error: true,
          message: "This resume is already added to your profile",
        })
      }
    }

  } catch (error) {
    return res.json({
      error: true,
      message: "Somthing went wrong, please check the payload",

    })
  }
  res.json({
    error: false,
    message: "Resume Added to your profile",

  })

})




module.exports = job