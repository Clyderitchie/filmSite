const { Schema, model } = require("mongoose");


const PostSchema = new Schema(
    {
        text: {
            type: String,
            unique: false,
        },
        picture: {
            type: String,
            allowNull: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
    },
    {
        toJson: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

const Post = model('Post', PostSchema);

module.exports = Post;