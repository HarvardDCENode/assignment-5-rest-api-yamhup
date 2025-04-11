const multer = require('multer');
const Trip = require('../models/tripModels');


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

class TripService {
    static create(obj){
        const image = new Trip(obj);
        return image.save();
    }

    static update(id, data){
        return Trip.findById(id)
        .then((image) => {
            image.set(data);
            image.save();
            return image;
        });
    }

    static read(id){
        return Trip.findById(id)
        .then((image)=> {
            return image;
        });
    }

    static list(){
        return Trip.find({})
            .then((images)=>{
                return images;
            });
    }

    static delete(){
        return Trip.deleteOne({_id: id})
        .then((obj)=> {
            return obj;
        })
    }
}

module.exports.storage = storage;
module.exports.imageFilter = imageFilter;
module.exports.TripService = TripService ;