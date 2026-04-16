import express from "express"
import { createPost, deletePosts, getAllPosts, getUserPosts } from "../controller/PostController.js";
import { authUser } from "../middleware/authUser.js";
import upload from "../middleware/upload.js";

const PostRouter = express.Router();

PostRouter.post("/create",authUser,upload.array("media"),createPost);
PostRouter.get("/all",getAllPosts);
PostRouter.get("/user",authUser,getUserPosts);
PostRouter.delete("/deletepost/:id",authUser,deletePosts);

export default PostRouter;