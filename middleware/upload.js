import multer from 'multer'; // store files

const storage = multer.diskStorage({   // three parameter request from frontend file and callback function
    destination: function(req,file,cb){   
        cb(null,"uploads/")  // callback is used to check whether error is there . if no error then value is null
    },
    filename: function(req,file,cb)  // this is used avoid duplicate filename name
    {
        cb(null,Date.now()+"-"+file.originalname)  //In storage name of file becomes 8765-photo.png 
    }
}) // files in local system 

const upload = multer({storage}); // bind storage 

export default upload;   // this is a middleware