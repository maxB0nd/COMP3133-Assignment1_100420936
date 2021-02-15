const Hotel = require('../models/Hotel');

exports.resolvers = {
  Query: {
    getHotel: async (parent, args) => {
      return await Hotel.find({});
    },
    getHotelByID: async (parent, args) => {
      return await Hotel.findById(args.hotel_id);
    },
    getHotelByHotelName: async (parent, args) => {
      return await Hotel.find({ "hotel_name": args.hotel_name });
    },
    getHotelByCity: async (parent, args) => {
      return await Hotel.find({ "city": args.city });
    },
  },
  Mutation: {
    addHotel: async (parent, args) => {
      const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      const postalExpression = /^\d\D\d\D\d\D$/;
      const isValidEmail = emailExpression.test(String(email).toLowerCase());
      const isValidPostal = postalExpression.test(String(postal_code).toLowerCase());
      const isValidPrice = !isNaN(price) && price >= 0;
      if (!isValidEmail) {
        throw new Error("email is not in proper format");
      }
      if (!isValidPostal) {
        throw new Error("Postal code in not in proper format");
      }
      if (!isValidPrice) {
        throw new Error("Price cannot be negative and should be a number");
      }
      let newHotel = new Hotel({
        hotel_id: args.hotel_id,
        hotel_name: args.hotel_name,
        street: args.street,
        city: args.city,
        postal_code: args.postal_code,
        price: args.price,
        email: args.email,
        user_id: args.user_id,
      })
      return await newHotel.save();
    },
    updateHotel: async (parent, args) => {
      if (!args.hotel_id) {
        return JSON.stringify({
          status: false,
          message: "No Hotel with this ID is found"
        });
      }
      return await Hotel.findByIdAndUpdate(
        { hotel_id: args.hotel_id },
        {
          $set: {
            hotel_id: args.hotel_id,
            hotel_name: args.hotel_name,
            street: args.street,
            city: args.city,
            postal_code: args.postal_code,
            price: args.price,
            email: args.email,
            user_id: args.user_id,
          }
        },
        { new: true },
        (err, Hotel) => {
          if (err) {
            return JSON.stringify({
              status: false,
              message: "Something went wrong when updating the Hotel"
            });
          } else {
            return Hotel;
          }
        }
      )
    },
    deleteHotel: async (parent, args) => {
      if (!args.hotel_id) {
        return JSON.stringify({
          status: false,
          message: "No Hotel with this ID is found"
        });
      }
      return await Hotel.findByIdAndDelete(args.hotel_id)
    },
  },
}