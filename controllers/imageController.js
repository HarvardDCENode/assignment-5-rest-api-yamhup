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
    static async list(){
        const trips = await Trip.find({});
        return trips;
    }

    static async create(obj){
        const path ='/static/images/' + obj.filename
        const trip = new Trip({
            originalname: obj.originalname,
            mimetype: obj.mimetype,
            filename: obj.filename,
            imageurl: path,
            //convert file size into KB
            size: obj.size / 1024 |0, 
            username: obj.username,
            title: obj.title,
            country: obj.country,
            city: obj.city,
            content: obj.content
        });
        const  newTrip = await trip.save();
        return newTrip
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