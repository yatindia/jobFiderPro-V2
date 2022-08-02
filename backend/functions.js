require("dotenv/config")
const jwt = require("jsonwebtoken")
const User = require("./models/User")


async function tokenAuth(authToken) {
  let token = authToken.split(" ")
  let final = jwt.verify(token[token.length - 1], process.env.JWT_HASH_KEY, async (err, decoded) => {

    let emailCheck = await User.findOne({ email: req.body.email })

    if (emailCheck.rememberToken !== token[token.length - 1]) {
      return {
        error: false,
        message: "The token is valid or expired",
        token: decoded
      }
    }

    if (err == null) {

      return {
        error: false,
        message: "The token is valid",
        token: decoded
      }
    } else {

      return {
        error: true,
        message: "The token is invalid"
      }
    }

  })

  return final;



}

function checkEmpty(param) {

  let err = "";
  for (const [key, value] of Object.entries(param)) {
    value === undefined ? err += key : ""

  }

  if (err != "") {
    return {
      error: true,
      message: `Please Fill the following fields ${err}`,
      status: err
    }
  } else {
    return {
      error: false,
      message: `Success`
    }
  }


}


function verifyToken(req, res, next) {
  let tes = req.body
  try {
    let token = (req.headers['authorization']).split(" ")
    jwt.verify(token[token.length - 1], process.env.JWT_HASH_KEY, (err, decoded) => {
      if (err == null) {
        
        
        req.body = {
          ...req.body,
          authorization : {
            _id : decoded.authid,
            type: decoded.type,
            email: decoded.email
          }
        }
        next()
      } else {
        console.log(err);
        return res.json({
          error: true,
          message: "The token is invalid1",
          back: token[token.length - 1]
        })
      }
    })
  } catch (error) {
    return res.json({
      error: true,
      message: "The token is invalid"
    })
  }
}




module.exports = {
  tokenAuth,
  checkEmpty,
  verifyToken
}