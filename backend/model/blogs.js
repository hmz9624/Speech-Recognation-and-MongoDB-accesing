import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    code: {
        code1: {
            type: Number,
            required: false
        }
    },
    zip: {
        type: String,
        required: false
    },
    photo: {
        data: String,
        contentType: String,
        photoName: String
    }
}, {
    timestamps: true
})



const blogSchema2 = new Schema({
    topic: {
        type: String,
        required: false
    },
    userSpeech: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


export const Blog = mongoose.model("Blog", blogSchema)
export const Blog2=mongoose.model("Blog2", blogSchema2)