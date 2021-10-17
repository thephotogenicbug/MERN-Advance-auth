const express = require('express')
const router = express.Router() // express.Router function


// {} is called destructure
const {register, login, forgotpassword, resetpassword} = require('../controllers/auth') 

// register post res route
router.route('/register').post(register); 

// login post res route
router.route("/login").post(login); 

// forgotpassword post res route
router.route("/forgotpassword").post(forgotpassword);

//resetpassword/:resetToken put res route
router.route("/resetpassword/:resetToken").put(resetpassword); 

// expose router variable
module.exports = router  