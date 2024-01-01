const mongoose = require('mongoose');
const {Schema} = mongoose;


const MovieSchema = new Schema({
  movie_name: String,
  genre: [String],
  rating: String,
  streaming_link: String,
},
{
  timestamps: {
    createdAt: '_created_at',
    updatedAt: '_updated_at',
  },
  versionKey: false,
});

module.exports = mongoose.model('Movie', MovieSchema, 'Movie');
