import express from 'express'
const router=express.Router();

import {getUser} from "../controllers/usercontroller.js";
router.route("/login").post(getUser);
export default router;