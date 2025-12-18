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
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate({
          path: "posts",
          populate: { path: "userId" },
        });
      }
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
          userId: context.user._id,
        });
        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { posts: post._id } },
          { new: true }
        );
        return post.populate("userId");
      }
      throw AuthenticationError;
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    deletePost: async (_, { postId }) => {
      console.log("Received the postId to delete: ", postId);

      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error("Post cannot be found.");
        }

        const deletePost = await Post.findByIdAndDelete(postId);

        return true;
      } catch (error) {
        console.error("Delete post error: ", error);
      }
    },
    deleteUser: async (_, { userId }) => {
      console.log("Received the userId to delete: ", userId);

      try {
        const user = User.findById(userId);

        if (!user) {
          throw new Error("User cannot be found ");
        }

        const deleteUser = await User.findByIdAndDelete(userId);

        return true;
      } catch (error) {
        console.error("Error with deleting user: ", error);
      }
    },
  },
};
