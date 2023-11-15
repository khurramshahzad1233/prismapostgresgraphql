import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import dotenv from "dotenv"
import sendtoken from "../utils/sendtoken.js";
import jwt_decode from "jwt-decode";
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:".env"})
};
import prisma from "../../db/db.config.js"


            
export const registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password,name}=req.body;
    if(!email ||!password){
        return next(new Errorhandler("please enter all fields",400))
    };
    let user=await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(user){
        return next(new Errorhandler("user already exist", 409))
    };
    user=await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })
    res.status(200).json({
        success:true,
        user,
    })
    // sendtoken(res,user,201,"register user successfully")
    

    
});


export const updateusercontroller=catchasyncerror(async(req,res,next)=>{
    const userid=req.params.id;
    const {name,email}=req.body;

    const user=await prisma.user.update({
        where:{
            id:Number(userid)
        },
        data:{
            name:name,
            email:email,
        }
    });

    return res.status(200).json({
        success:true,
        user

    })
});


export const getallusercontroller=catchasyncerror(async(req,res,next)=>{
    const alluser=await prisma.user.findMany({
        include:{
            post:{
                select:{
                    title:true,
                    comment_count:true
                }
            }
        }
    });

    res.status(200).json({
        success:true,
        alluser
    })
})


export const deleteusercontroller=catchasyncerror(async(req,res,next)=>{
    const userid=req.params.id;
    await prisma.user.delete({
        where:{
            id:Number(userid)
        }
    })
    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })
})

export const loginusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        return next(new Errorhandler("please enter all fields",400))
    };
    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("incorrect email",401))
    };
    const matchpassword=await user.comparepassword(password);
    
    if(!matchpassword){
        return next(new Errorhandler("incorrect password",401))
    };
    sendtoken(res,user,200,"welcome back")
});


export const logoutusercontroller=catchasyncerror(async(req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }).json({
        success:true,
        message:"logout successfully"
    })
})


export const getprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("please login to access the resource",401))
    };
    res.status(200).json({
        success:true,
        user,
    })
});



// google authentication controller

export const googleregistercontroller=catchasyncerror(async(req,res,next)=>{
    const {token}=req.body;
    
    if(!token){
        return next(new Errorhandler("require field are missing",400))
    };
    const userinfo=jwt_decode(token);
    const loginBy="google"

    const {email,name,picture}=userinfo;
    let user=await userdata.findOne({email});
    if(!user){
        user=await userdata.create({
            email,name,picture,loginBy,
        });
    };
    sendtoken(res,user,201,"register user successfully")

});
