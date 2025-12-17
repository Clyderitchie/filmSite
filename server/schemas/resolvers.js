const { AuthenticationError, signToken } = require("../utils/auth");
const { User, Post } = require("../models");

module.exports = {
  Query: {
    getAllUsers: async () => {
      return await User.find({}).populate("posts");
    },
    getUser: async (_, args) => {
      return await User.findById(args.userId).populate({
        path: "posts",
        populate: { path: "userId" },
      });
    },
    getAllPosts: async () => {
      return await Post.find({}).populate("userId");
    },
    getPost: async (_, args) => {
      return await Post.findById(args.postId).populate("userId");
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    createPost: async (_, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          userId: useContext.user._id,
        });
        await User.findByIdAndUpdate(
          useContext.user._id,
          { $push: { posts: post._id } },
          { new: true }
        );
        return post.populate("userId");
      }
      throw AuthenticationError;
    },
  },
};
