import express from 'express'
import fs from 'fs'
import upload from "express-fileupload"
import cookieParser from 'cookie-parser';
import {
    router1,
    router2
} from './router/router.js'
import mongoose from 'mongoose'
import {
    Blog
} from "./model/blogs.js"

const app = express()

import {
    dirname
} from 'path';
import path from 'path';
import {
    fileURLToPath
} from 'url';

const __dirname = dirname(fileURLToPath(
    import.meta.url));


app.use(express.json({
    limit: '50mb'
}))
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', "frontend")))
app.use(upload())

app.use("/settings", router1)
app.use("/html", router2)

app.use("/favicon.ico", (req, res) => {
    res.send("deneme")
    res.end("")
})

const dbUrl = 'mongodb+srv://Hamza16:Sananemongodb1.@cluster0.jmmwv.mongodb.net/Node-blog?retryWrites=true&w=majority'
mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        console.log("Database connection OK")
    }).catch((error) => {
        console.log("database error: ", error)
    })


const port = process.env.PORT || 81
app.listen(port, () => {
    console.log("listening on port " + port)
})