const User = require('../models/User');

exports.resolvers = {
  Query: {
    getUser: async (parent, args) => {
      return await User.find({});
    },
    getUserByUserID: async (parent, args) => {
      return await User.find({ "user_id": args.user_id });
    },
    getUserByUsername: async (parent, args) => {
      return await User.find({ "username": args.username });
    },
    getUserByEmail: async (parent, args) => {
      return await User.find({ "email": args.email });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      const isValidEmail = emailExpression.test(String(args.email).toLowerCase());
      const isValidUserName = args.username && args.username.length >= 4;
      const isValidPassword = args.password && args.password.length >= 8;
      if (!isValidEmail) {
        throw new Error("email is not in proper format");
      }
      if (!isValidUserName) {
        throw new Error("username is too short");
      }
      if (!isValidPassword) {
        throw new Error("password is too short");
      }
      let newUser = new User({
        user_id: args.user_id,
        username: args.username,
        email: args.email,
        password: args.password,
      })
      return await newUser.save();
    },
    updateUser: async (parent, args) => {
      if (!args.user_id) {
        return JSON.stringify({
          status: false,
          message: "No User with this ID is found"
        });
      }
      return await User.findOneAndUpdate(
        { user_id: args.user_id },
        {
          $set: {
            user_id: args.user_id,
            username: args.username,
            password: args.password,
            email: args.email,
          }
        },
        { new: true },
        (err, user) => {
          if (err) {
            return JSON.stringify({
              status: false,
              message: "Something went wrong when updating the user"
            });
          } else {
            return user;
          }
        }
      )
    },
    deleteUser: async (parent, args) => {
      if (!args.user_id) {
        return JSON.stringify({
          status: false,
          message: "No User with this ID is found"
        });
      }
      return await User.findOneAndDelete({ "user_id": args.user_id })
    },
  },
}