

const multer= require('multer');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}


const storage=multer.diskStorage({
  destination : (req ,file,cb) =>
  {
    //console.log('request'+querystring.stringify(req));
    const isValid=MIME_TYPE_MAP[file.mimetype];
    let error=new Error("Invalid MimeType");
    if(isValid)
    error=null;

    cb(error,"backend/images");
  },
  filename: (req ,file,cb) => {
    console.log(file);
    const name=file.originalname.toLowerCase().split(' ').join('-');
    const ext= MIME_TYPE_MAP[file.mimetype];
    cb(null,name + '-' +Date.now()+'.'+ext);

  }
});
module.exports = multer({storage:storage}).single("image");

