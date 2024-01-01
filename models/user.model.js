const mongoose = require('mongoose');
const {Schema} = mongoose;
const Userschema = new Schema({
  user_id: String,
  username: String,
  password: String,
  role: String,
},
{
  timestamps: {
    createdAt: '_created_at',
    updatedAt: '_updated_at',
  },
  versionKey: false,
});
module.exports = mongoose.model('User', Userschema, 'User');
