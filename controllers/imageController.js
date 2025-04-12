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
        console.log(`Get all trips: ${trips}`);
        return trips;
    }

    static async read(id){
        const trip = await Trip.findById(id)
        console.log(`Return a single trip: ${trip}`)
        return trip
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
        console.log(`Successfully create a new trip" ${newTrip}`)
        return newTrip
    }

    static async update(id, data){
        const trip = await Trip.findById(id)
        console.log(`Trying to update trip Id: ${id}`)
        
        trip.set(data)
        await trip.save();
        console.log(`Successfully update a trip" ${trip}`)
        return trip;
    }



    static async delete(){
        const obj = await Trip.deleteOne({_id: id})
        console.log(`Successfully delete a trip: ${obj}`)
        return obj;
    }
}

module.exports.storage = storage;
module.exports.imageFilter = imageFilter;
module.exports.TripService = TripService ;