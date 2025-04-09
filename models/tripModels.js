const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const schema = new Schema({
    originalname: { type: String, required:true},
    mimetype: {type: String, required:true},
    filename:{type:String, required:true},
    imageurl: {type: String, required:true},
    username: {type: String, required:true},
    title:  {type: String, required:true},
    country: {type: String, required:true},
    city: {type: String, required:true},
    content: {type: String, required:true},
    size: {type: String, required:true},
    createdAt: {type: Date},
    updatedAt: {type: Date}
})

schema.pre('save', function(next){
    if (!this.createdAt){
        this.createdAt = new Date();
    }else {
        this.updatedAt = new Date();
    }
    next();
});

module.exports = mongoose.model('Trip', schema) 