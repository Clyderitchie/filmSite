const { AuthenticationError, signToken } = require("../utils/auth");
const { User } = require("../models");

module.exports = {
  Query: {
    getAllUsers: async () => {
      return await User.find({});
    },
    getUser: async (_, args) => {
      console.log("User Id: ", args);
      return await User.findById(args.userId);
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  },
};
