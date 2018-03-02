const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // config issue

const Schema = mongoose.Schema;
const bycrpt = require('bcrypt-nodejs');

// This is how the data will be stored in the mongodb
const userSchema = new Schema({
  username:  {type: String, lowercase: true, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, lowercase: true, required: true, unique: true}
});

// Schema Middleware to Encrypt Password
// userSchema.pre('save', function(next) {
//   // Ensure password is new or modified before applying encryption
//   if (!this.isModified('password'))
//     return next();

  // Apply encryption
//   bcrypt.hash(this.password, null, null, (err, hash) => {
//     if (err) return next(err); // Ensure no errors
//     this.password = hash; // Apply encryption to password
//     next(); // Exit middleware
//   });
// });

// // Methods to compare password to encrypted password upon login
// userSchema.methods.comparePassword = (password) => {
//   return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
// };
module.exports = mongoose.model('User', userSchema);