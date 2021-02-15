const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
    min: 0
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLenght: 4,
    validate: {
      validator: function (username) {
        return username.length >= 4;
      },
      message: props => `Username ${props.value} is too short (have to be at least 4 charachters long)`
    }
  },
  password: {
    type: String,
    required: true,
    minLenght: 8,
    validate: {
      validator: function (password) {
        return password.length >= 8;
      },
      message: props => `Password ${props.value} is too short (have to be at least 8 charachters long)`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (email) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(String(email).toLowerCase());
      },
      message: props => `${props.value} is not a valid email`
    }
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;