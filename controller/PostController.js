import Post from "../models/post.js"
import Comments from "../models/Comments.js"
import cloudinary from "../services/cloudinary.js";
import fs from "fs" // file system features


// export const createPost=async (req,res) => {
//     try {
//         const{caption,location}=req.body;
//         const media = req.files.map((file)=>{
//             return{
//                 mediaType:file.mimetype.startsWith("image")?"image":"video",
//                 mediaUrl:file.filename
//             }
//         });
//         const userId=req.user.id;
//         const newPost = await Post.create({
//             caption,
//             location,
//             media,
//             userId
//         })
//         res.status(201).json({success:true,message:"Post Created",data:newPost});

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({success:false,message:"Error in Creating Post"});
//     }
// }

// export const getAllPosts=async(req,res)=>{
//     try {
//         const posts = await Post.find().populate("userId","name profilePicture").sort({createdAt:-1});
//         res.status(200).json({success:true,message:"All Posts",data:posts})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({success:false,message:"Error in Fetching Posts"})
//     }   
// } 

export const getAllPosts=async(req,res)=>{
    try {
        //math.max(value,minvalue (if the data is not given))
        const page = Math.max(Number(req.query.page) || 1,1)
        const limit = Math.min(Number(req.query.limit) || 5,20)
        const skip = (page-1)*limit

        const posts = await Post.find().populate("userId","name profilePicture").sort({createdAt:-1}).skip(skip).limit(limit);

        const totalposts = await Post.countDocuments();

        const totalpages= Math.ceil(totalposts/limit)

        res.status(200).json({
            success:true,message:"All Posts",data:posts,
            paginatedData:{
            currentPage:page,
            totalpages:totalpages,
            totalposts:totalposts,
            hasNextPage: page<totalpages ,
            hasPrevPage:page>1
        }})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error in Fetching Posts"})
    }
}

export const getUserPosts=async(req,res)=>{
    try {
        const posts = await Post.find({userId:req.user.id}).populate("userId","name profilePicture").sort({createdAt:-1});
        res.status(200).json({success:true,message:"User Posts",data:posts})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error in Fetching User Posts"})
    }
}

export const deletePosts = async (req,res) => {
    try {
        const id = req.params.id;
        const userID = req.user.id;
        const existPost = await Post.findById(id);
        if(!existPost)
        {
            return res.status(400).json({success:false,message:"No Post Exist"})
        }
        if(existPost.userId.toString()!== userID)
        {
            return res.status(400).json({success:false,message:"Unauthorized"})
        }
        for(const media of existPost.media)
        {
            await cloudinary.uploader.destroy(media.publicId)
        }
        const post = await Post.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Post Deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error in Fetching User Posts"+error})
    }
}

export const createPost=async (req,res) => {
    try {
        const{caption,location}=req.body;
        const media = [];
        for (const file of req.files) {
            //uploading files
            const result = await cloudinary.uploader.upload(file.path,{
                folder:"Social"
            })

            media.push({
                mediaType:file.mimetype.startsWith("image")?"image":"video",
                mediaUrl:result.secure_url,
                publicId:result.public_id
            })

            fs.unlinkSync(file.path)
            
        }
        const userId=req.user.id;
        const newPost = await Post.create({
            caption,
            location,
            media,
            userId
        })
        res.status(201).json({success:true,message:"Post Created",data:newPost});

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error in Creating Post"});
    }
}

///route parameter : in Routing ,   in query nedd not write in Routing 


//git pull , copy of branch  to brach 1 , branch branch and the n main