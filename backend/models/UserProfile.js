const mongoose = require("mongoose")

const UserProfileSchema = mongoose.Schema({
  
  dateOfBirth: {
    type: String,
    required: true,
  },

  link_id: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  jobTitle: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  appliedFor: [{
    type: String
  }],

  pastJobs: [{
    type: Object,
    required: true,
  }],

  qualifications: [{
    type: Object,
    required: true,
  }],
  techQualifications: [{
    type: Object,
    required: true,
  }],

  accountConfirmed: {
    type: Boolean,
    default: false,
  },

  resume: {
    type: String,
    required: false,
  },

  dateOfSignup: {
    type: Date,
    default: Date.now(),
  },
})
module.exports = mongoose.model("Userprofile", UserProfileSchema)