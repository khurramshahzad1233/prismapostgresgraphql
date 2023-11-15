import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import dotenv from "dotenv"
import sendtoken from "../utils/sendtoken.js";
import jwt_decode from "jwt-decode";
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:".env"})
};
import prisma from "../../db/db.config.js";


            
export const registerpostcontroller=catchasyncerror(async(req,res,next)=>{
    const {user_id,title,description}=req.body
    const allpost=await prisma.post.create({
        data:{
            user_id:Number(user_id),
            title,description
        }
    })
    
    res.status(201).json({
        success:true,
        allpost
    })
});


export const getallpostcontroller=catchasyncerror(async(req,res,next)=>{
    const allpost=await prisma.post.findMany({});

    res.status(200).json({
        success:true,
        allpost
    })
});


export const getpostbyidcontroller=catchasyncerror(async(req,res,next)=>{
    const postid=req.params.id;
    const post=await prisma.post.findFirst({
        where:{
            id:Number(postid)
        }
    });
    res.status(200).json({
        success:true,
        post
    })
});


export const deletepostbyidcontroller=catchasyncerror(async(req,res,next)=>{
    const postid=req.params.id;
    await prisma.post.delete({
        where:{
            id:Number(postid)
        }
    });
    res.status(200).json({
        success:true,
        message:"post deleted successfully"
    })
})

    




