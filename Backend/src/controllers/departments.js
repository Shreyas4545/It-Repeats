import  Department  from "../models/departments.js";
import fs from "fs";
import db from "../db/init";

const adddepart = async(req,res) =>{
      let x=new Department(
              req.body.departmentName,req.body.departmentCode
      )
      let y= await x.save();
      if(!y)
      {
        return res.status(401).json({
            message:"Error",
            success:false
        });
      }
      else{
        return res.status(200).json({
            message:"Success",
            success:true
        });
      }
}

const getdepart = async(req,res)=>{
      const xyz = await db.collection('Department').get();
      let details=[];
      
      xyz.forEach(element => {
        details.push(element.data());
      });
      if(!xyz)
      {
        return res.status(401).json({
            message:"Error",
            success:false
        });
      }
      else{
        return res.status(200).json({
            message:"Success",
            success:true,
            data:details
        });
      }
}
export {adddepart,getdepart};