
const Post=require('../models/post');

exports.createPost = (req,res,next) => {

  console.log("reached");


 const url=req.protocol+"://"+req.get("host");
 console.log("url"+url);
 const post=new Post({
   title:req.body.title,
   content:req.body.content,
   imagePath:url + '/images/'+req.file.filename,
    creator: req.userData.user
 });



 post.save().then(createdPost =>
   {

     res.status(201).json({
       message :'post added Successfully',
       post :{
         ...createdPost, //copy the properties of object
         id: createdPost._id //Overwrite Some Sleected Property

       }
     });
   })
   .catch(error => {
     res.status(500).json({
       message: 'creating a post Failed!'
     })
   });


}
exports.getPosts = (req, res, next) => {
  console.log(req.query);
  const pageSize=+req.query.pagesize;
  const currentPage= +req.query.page;
  const postQuery =Post.find();
  let fetchedPosts;

  if(pageSize && currentPage)
  {
    postQuery.skip(pageSize * (currentPage -1)).limit(pageSize);

  }

    postQuery.then(documents => {
      fetchedPosts= documents;
      return Post.count();

    }).then( count =>
    {
       res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: fetchedPosts ,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'fetching  posts Failed!'
      })
    });

  }

  exports.updatePost =   (req, res, next) => {
    let imagePath=req.body.imagePath;
    if(req.file)
    {
     const url=req.protocol+"://"+req.get("host");

       imagePath=url + '/images/'+req.file.filename;

    }

   const post = new Post(
     {
       _id:req.params.id,
       title:req.body.title,
       content:req.body.content,
       imagePath:imagePath,
       creator: req.userData.user

     });

     Post.updateOne({ _id: req.params.id, creator :req.userData.user }, post).then(result => {
       if(result.n >0)
       {
         res.status(200).json({ message: "Update successful!" });
       } else
       {
         res.status(401).json({ message: "Not Authorised!" });
       }

     })
       .catch(error => {
         res.status(500).json({
           message: 'Couldn\'t Update post!'
         })
       });
   }


   exports.getPost = (req, res, next) => {


    Post.findById(req.params.id).then(post => {
      if(post) {
        res.status(200).json(post);
      } else
      {
        res.status(404).json({
          message: 'Posts not Found !',

        });
      }

    })
    .catch(error => {
      res.status(500).json({
        message: 'fetching  a post Failed!'
      })
    });;

  }
  exports.deletePost = (req,res,next) =>
  {

    Post.deleteOne({_id:req.params.id, creator :req.userData.user}).then(result =>
    {
      if(result.n>0)
      {
        res.status(200).json({ message: "Delete successful!" });
      } else
      {
        res.status(401).json({ message: "Not Authorised!" });
      }

    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting  posts Failed!'
      });
    });

  }
