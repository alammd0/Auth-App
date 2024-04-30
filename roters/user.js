const expreess = require("express");
const router = expreess.Router();


const { signUp, login } = require("../controller/auth");
// const { model } = require("mongoose");
router.post("/signup", signUp);
router.post("/login", login);

module.exports = router ; 


