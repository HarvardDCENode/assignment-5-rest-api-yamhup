const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/images');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const imageFilter = function(req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)){
        cb (null, true);
    } else {
        cb(new Error('OnlyImageFilesAllowed'), false);
    }
}


module.exports.storage = storage;
module.exports.imageFilter = imageFilter ;