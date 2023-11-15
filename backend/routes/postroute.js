
import express from "express"
import { deletepostbyidcontroller, getallpostcontroller, registerpostcontroller } from "../controller/postcontroller.js";
const router=express.Router();

router.route("/post/register").post(registerpostcontroller)
router.route("/post/all").get(getallpostcontroller);
router.route("/post/:id").delete(deletepostbyidcontroller)



export default router;