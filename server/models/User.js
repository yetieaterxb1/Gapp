const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SALT_ROUNDS = 5

const _projectSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  likedIds: {
    type: Array,
    default: []
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  }
})

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
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
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
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
  projects: [ _projectSchema ]
})

userSchema
  .virtual('password')
  .set(function(password) {
    this.password_hash = this.encryptPassword(password)
  })
  .get(function(password) {
    return this.password_hash
  })

userSchema.methods = {
  authenticate: function(hash) {
    return bcrypt.compare(hash, this.password)
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

const User = mongoose.model('User', userSchema)

module.exports = User


