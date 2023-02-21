import db from "../db/init";
import Subject from "../models/subjectName";

const addSub = async (req, res) => {
  const { DepartmentName, Semester, SubjectName, SubjectCode } = req.body;
  console.log(req.body);
  if(!DepartmentName || !Semester || !SubjectName){
    return res.status(400).json({
        success: false,
        message: 'Bad Request'
    })
  }
  
  let x = new Subject(DepartmentName, Semester, SubjectName, SubjectCode);
  let y = await x.save();
  if (!y) {
    return res.status(401).json({
      message: "Error",
      success: false,
    });
  } else {
    return res.status(200).json({
      message: "Success",
      success: true,
    });
  }
};

const getSub = async (req, res) => {
  const { DepartmentName, Semester, SubjectName, SubjectCode } = req.query;
  console.log(DepartmentName,Semester);
  let query = db.collection("Subjects");
  if (DepartmentName) {
    query = query.where("DepartmentName", "==", DepartmentName);
  }
  if (Semester) {
    query = query.where("Semester", "==", Semester);
  }
  if (SubjectName) {
    query = query.where("SubjectName", "==", SubjectName);
  }
  if (SubjectCode) {
    query = query.where("SubjectCode", "==", SubjectCode);
  }
  const b = await query.get();
  let details = [];
  if (!b) {
    return res.status(501).json({
      message: "Internal Server Error",
      success: false,
    });
  } else {
    b.forEach((element) => {
      details.push(element.data());
    });
    if(details.length===0)
    {
      return res.status(200).json({
        message:"No Subject Exists for the entered details",
        success:false,
      });
    }
    return res.status(200).json({
      message: "Success",
      success: true,
      data: details,
    });
  }
};
export { addSub, getSub };
