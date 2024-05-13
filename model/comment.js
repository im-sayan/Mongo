const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    edited: {
        type: Boolean,
        default: false
    },
    reply: [
        {
            commenter: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            comment: {
                type: String,
            },
            like: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
            edited: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            updatedAt: {
                type: Date,
                default: Date.now()
            },
            reply: [
                {
                    commenter: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                    },
                    comment: {
                        type: String,
                    },
                    like: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'User',
                        },
                    ],
                    edited: {
                        type: Boolean,
                        default: false
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now()
                    },
                    updatedAt: {
                        type: Date,
                        default: Date.now()
                    }
                }
            ]
        }
    ]
}, {
    timestamps: true
})
const Comment = mongoose.model('comments', commentSchema)

module.exports  = Comment
