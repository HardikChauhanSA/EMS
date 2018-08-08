const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

let UserSchema = new Schema({
    firstname: {type: String, required: true , max: 100},
    lastname: {type: String, required: true ,max: 100},
    age: {type: Number, required: true, max: 100},
    gender: {type: String, required: true , max: 100},
    address: {type: String, required: true,trim: true },
    password: {type: String, required: true},
    email: {type: String,  unique: true,  required: true, trim: true },
    image: {type: String}
});

UserSchema.pre('save', function (next) {
    var user = this;

    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;

      console.log(user.password);
      next();


    })
  });
  UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Export the model
module.exports = mongoose.model('User', UserSchema);
