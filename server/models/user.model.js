import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
       type: String,
    required:true
    },

     email:{
        type: String,
        required:true
     },
     password:{
        type: String,
        required:true
     },
     role:{
        type:String,
        enum:["instructor","student"],
        default:'student'
     },

     enrolledCourses:[
             {
                type:mongoose.Schema.Types.ObjectId, //type: mongoose.Schema.Types.ObjectId is used to define a reference to another document in MongoDB.
                ref:'Course' //It tells Mongoose:
            //This ObjectId points to a document in the <ref> collection."
            //ref: 'Course' means each ObjectId in enrolledCourses refers to a document in the Course model.
             } 
     ],

     photoUrl:{
        type:String,
        default:""
     }

},{timestamps:true});

export const User=mongoose.model("User",userSchema)