const express  = require("express") ;
const router  = express.Router() ;
const {addMother} = require("../controller/mother_controller") ;
const {signupClient} = require("../controller/userController") ;

router.post("/mothers/signup", addMother );
router.post("/clients/signup", signupClient) ;

// router.get("/redirect/:id", handleRedirectURL)

module.exports = router ;

