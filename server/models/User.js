const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SALT_ROUNDS = 5

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    dropDups: true,
    required: true
  },
  password_hash: {
    type: String,
    required: true
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

UserSchema
  .virtual('password')
  .set(function(password) {
    this.password_hash = this.encryptPassword(password)
  })
  .get(function(password) {
    return this.password_hash
  })

UserSchema.methods = {
  authenticate: function(hash) {
    return bcrypt.compareSync(hash, this.password)
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return bcrypt.hashSync(password, SALT_ROUNDS)
    } catch (err) {
      return 'Error:' + err
    }
  }
}

module.exports = mongoose.model('User', UserSchema)