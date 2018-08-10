
const express=require('express');
const router=express.Router();
const checkAuth=require("../middleware/check-auth");
const postController = require("../controllers/posts");
const extractFile = require("../middleware/file");

const querystring =require('querystring');


router.post("",checkAuth,extractFile,postController.createPost);

router.get("",postController.getPosts );

router.get("/:id", postController.getPost);



router.put("/:id",checkAuth,extractFile ,postController.updatePost);



router.delete("/:id",checkAuth, postController.deletePost);

module.exports=router;
