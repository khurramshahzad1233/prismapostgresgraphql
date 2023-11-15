
import express from "express"
import { deleteusercontroller, getallusercontroller, getprofilecontroller, googleregistercontroller, loginusercontroller, logoutusercontroller, registerusercontroller, updateusercontroller} from "../controller/usercontroller.js";
import {authuser} from "../middleware/auth.js"


const router=express.Router();
router.route("/user/register").post(registerusercontroller);
router.route("/user/update/:id").put(updateusercontroller);
router.route("/user/all").get(getallusercontroller)
router.route("/user/:id").delete(deleteusercontroller)
router.route("/user/login").post(loginusercontroller);
router.route("/user/logout").get(logoutusercontroller);
router.route("/user/me").get(authuser,getprofilecontroller);
router.route("/google/new").post(googleregistercontroller);





export default router  ;