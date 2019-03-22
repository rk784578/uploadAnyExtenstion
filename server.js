const express = require('express');
const multer = require('multer');
var path = require('path')
const app = express();



function fileFilter (req, file, cb) {
    /*if (path.extname(file.originalname) !== ('.mp4') || ('.jpeg') || ('.png') ) {
    	console.log('if');
        return cb(null, false);
    }else{
    	console.log('else');
    cb(null, true);
	
    }*/
        cb(null, true);

    }


  let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage ,fileFilter:fileFilter});


app.get('/', (req, res) => {
    res.sendfile('upload.html');
});

app.post('/upload', upload.single('VideoToUpload'), function(req, res) {
    console.log('undefined here',req.file);
    //console.log''(req.params);
    if (req.file) {
        console.log("successfully received");
        res.send({success: "success"});
    }
    return res.end();
});

app.listen(3000, () => console.log('Listening on Port 3000.'));