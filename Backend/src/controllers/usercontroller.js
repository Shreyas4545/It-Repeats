// import db from "../db/init";
import User from "../models/usermodel";
import * as firebase from "firebase/app"
import {createUserWithEmailAndPassword,getAuth,signInWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA675BDT-y-w3MgpLqSUQBQhfITS-3Sf30",
  authDomain: "it-repeats-ea39a.firebaseapp.com",
  projectId: "it-repeats-ea39a",
  storageBucket: "it-repeats-ea39a.appspot.com",
  messagingSenderId: "416035944161",
  appId: "1:416035944161:web:ea8d9ea263537baf8369a0",
  measurementId: "G-DXHP86H5DK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//User registration
// const saveUser= async(req,res)=>{
//     const {name,email,password}= req.body;
//     const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user.uid;                                                                                                                               
//     console.log(user);
//     return res.status(200).json({
//               success:true,
//               message:"Successfully Registered",
//               data:user
//           })
//   })
//   .catch((error) => {
//     return res.status(401).json({
//               success:false,
//               message:"You are already Registered"
//           })
//   });
// }

const getUser = async(req,res)=>{
    const auth=getAuth();
    signInWithEmailAndPassword(auth,req.body.email,req.body.password).then((userCredential)=>{
      const user=userCredential.user.uid;
      return res.status(200).json({
        success:true,
        message:"Successfully Logged In",
        data:user
    })
    }).catch(err =>{
      console.log(err);
      return res.status(401).json({
        success:false,
        message:"Invalid Login"
    })
    })
}

export {getUser};