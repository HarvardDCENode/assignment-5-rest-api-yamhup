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
        const trip= new Trip(obj);
        return trip.save();
    }

    static update(id, data){
        return Trip.findById(id)
        .then((trip) => {
            trip.set(data);
            trip.save();
            return trip;
        });
    }

    static read(id){
        return Trip.findById(id)
        .then((trip)=> {
            return trip;
        });
    }

    static list(){
        return Trip.find({})
            .then((trips)=>{
                return trips;
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