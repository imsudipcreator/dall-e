import express from "express";
import {v2 as cloudinary} from  'cloudinary';
import * as dotenv from "dotenv";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config(
    {cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

    }
)

//get all posts
router.route('/').get(async(req,res)=>{
 try {
    const posts = await Post.find({});

    res(200).json({success:true, data : posts})
 } catch (error) {
    res(500).json({success:false, message : error})
 }
})

//create a post
router.route('/').get(async(req,res)=>{
try {
      const {prompt , photo , name}   = req.body;
    
      const photoUrl = await cloudinary.uploader.upload(photo);
    
    
      const newPost = await Post.create({
        name, prompt,
        photo : photoUrl.url,
      })
    
      res.status(201).json({success:true, data : newPost});
} catch (error) {
    res.status(500).json({success:false, message : error});
}
})


export default router
