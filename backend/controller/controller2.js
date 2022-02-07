import fs from 'fs'
import {
    dirname
} from 'path';
import {
    fileURLToPath
} from 'url';

const __dirname = dirname(fileURLToPath(
    import.meta.url));

const controller2 = {}

controller2.portfolio = (req, res) => {
    fs.readFile(__dirname + '/../../frontend/html/Portfolio.html', "utf8", (err, data) => {
        if (err) {
            throw new Error(err.message)
        } else {

            res.status(200).write(data)
            res.end("");
        }
    })
}

controller2.SpeechToText = (req, res) => {
    fs.readFile(__dirname + '/../../frontend/html/SpeechToText.html', "utf8", (err, data) => {
        if (err) {
            throw new Error(err.message)
        } else {

            res.status(200).write(data)
            res.end("");
        }
    })
}

controller2.AllSpeech = (req, res) => {
    fs.readFile(__dirname + '/../../frontend/html/AllSpeech.html', "utf8", (err, data) => {
        if (err) {
            throw new Error(err.message)
        } else {

            res.status(200).write(data)
            res.end("");
        }
    })
}

controller2.FaceID = (req, res) => {
    fs.readFile(__dirname + '/../../frontend/html/FaceID.html', "utf8", (err, data) => {
        if (err) {
            throw new Error(err.message)
        } else {

            res.status(200).write(data)
            res.end("");
        }
    })
}
controller2.AllComponents = (req, res) => {
    fs.readFile(__dirname + '/../../frontend/html/AllComponents.html', "utf8", (err, data) => {
        if (err) {
            throw new Error(err.message)
        } else {

            res.status(200).write(data)
            res.end("");
        }
    })
}
controller2.Add = (req, res) => {
    fs.readFile(__dirname + '/../../frontend/html/Add.html', "utf8", (err, data) => {
        if (err) {
            throw new Error(err.message)
        } else {

            res.status(200).write(data)
            res.end("");
        }
    })
}
controller2.Delete = (req, res) => {
    fs.readFile(__dirname + '/../../frontend/html/Delete.html', "utf8", (err, data) => {
        if (err) {
            throw new Error(err.message)
        } else {

            res.status(200).write(data)
            res.end("");
        }
    })
}

controller2.Update = (req, res) => {
    fs.readFile(__dirname + '/../../frontend/html/Update.html', "utf8", (err, data) => {
        if (err) {
            throw new Error(err.message)
        } else {

            res.status(200).write(data)
            res.end("");
        }
    })
}

controller2.Contact = (req, res) => {
    fs.readFile(__dirname + '/../../frontend/html/Contact.html', "utf8", (err, data) => {
        if (err) {
            throw new Error(err.message)
        } else {

            res.status(200).write(data)
            res.end("");
        }
    })
}

export default controller2;