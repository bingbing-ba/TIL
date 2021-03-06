const {genreSchema} = require('./genre');
const mongoose = require('mongoose');
const Joi = require('joi');

/* Models */
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    release:{
        type:Date,
        default:Date.now(),
    },
    mainActor:{
        type:String,
        minlength:1,
    },
    genre: [{
        type:genreSchema,
        required:true,
    }]
});

const Movie = mongoose.model('Movie',movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        mainActor: Joi.string().min(1),
        genreId: Joi.string().required(),
    }
    return Joi.validate(movie,schema);
}

module.exports = {Movie, validateMovie};