const multer = require('multer');
const TripImage = require('../models/tripModels');


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

class TripImageService {
    static create(obj){
        const image = new TripImage(obj);
        return image.save();
    }

    static update(id, data){
        return TripImage.findById(id)
        .then((image) => {
            image.set(data);
            image.save();
            return image;
        });
    }

    static read(id){
        return TripImage.findById(id)
        .then((image)=> {
            return image;
        });
    }

    static list(){
        return TripImage.find({})
            .then((images)=>{
                return images;
            });
    }

    static delete(){
        return TripImage.deleteOne({_id: id})
        .then((obj)=> {
            return obj;
        })
    }
}

module.exports.storage = storage;
module.exports.imageFilter = imageFilter;
module.exports.TripImageService = TripImageService ;