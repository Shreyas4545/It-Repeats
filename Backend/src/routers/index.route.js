// import { Router } from 'express';
import express from "express";
const router = express.Router();
import { adddepart,getdepart } from "../controllers/departments.js";
import {addSub,getSub} from "../controllers/SubjectNames.js";
import { saveQuestionPaper,getQuestionPaper,deleteQp} from '../controllers/questionPaper.controller.js'
import multer from "multer"

     const storage=  multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "../Backend/src/uploads");
          },
          filename: (req, file, cb) => {
            cb(null, file.originalname);
          },
    })

const upload= multer({storage:storage});
router.route("/save-details").post(upload.single("image"),saveQuestionPaper);
router.route('/get-details').get(getQuestionPaper); 
router.route('/delete/:id').delete(deleteQp);
router.route('/add-depart').post(adddepart);
router.route("/get-depart").get(getdepart);
router.route("/add-sub").post(addSub);
router.route("/get-sub").get(getSub);
export default router;

