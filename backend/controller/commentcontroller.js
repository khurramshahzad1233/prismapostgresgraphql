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
    
    res.status(200).json({
        success:true,
        user,
    })
    // sendtoken(res,user,201,"register user successfully")
    

    
});


import prisma from "../DB/db.config.js";

export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      post: {
        include: {
          user: true,
        },
      },
    },
  });
  return res.json({ status: 200, data: comments });
};

export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  //   * Increase the comment counter
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const newComent = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });

  return res.json({
    status: 200,
    data: newComent,
    msg: "Comment created successfully.",
  });
};

// * Show user
export const showComment = async (req, res) => {
  const commentId = req.params.id;
  const post = await prisma.comment.findFirst({
    where: {
      id: Number(commentId),
    },
  });

  return res.json({ status: 200, data: post });
};

// * Delete user
export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  //   * Increase the comment counter
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });
  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });

  return res.json({ status: 200, msg: "Post deleted successfully" });
};


