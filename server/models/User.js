//https://github.com/shamahoque/mern-social/blob/master/server/models/user.model.js
const SALT_ROUNDS = 5

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  password: {
    type: String,
    required: "Password is required"
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: false
    // required: 'Email is required'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now()
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  models: {
    type: Array

  }
})

// UserSchema
//   .virtual('password') // Must change password to hashed_password in the schema
//   .set(function(password) {
//     this.password = this.encryptPassword(password)
//   })
//   // .get(function() {
//   //   return this.password
//   // })

// UserSchema.methods = {
//   authenticate: function(plainText) {
//     // return this.encryptPassword(plainText) === this.hashed_password
//     bcrypt.compare(plainText, this.password)
//   },
//   encryptPassword: function(password) {
//     if (!password) return ''
//     try {
//       return bcrypt.hashSync(password, SALT_ROUNDS)
//     } catch (err) {
//       return 'Error:' + err
//     }
//   }
// }

module.exports = mongoose.model('User', UserSchema)