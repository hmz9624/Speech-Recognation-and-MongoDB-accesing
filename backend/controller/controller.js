import fs from 'fs'
import {
    Blog,
    Blog2
} from "../model/blogs.js"
import {
    dirname
} from 'path';
import {
    fileURLToPath
} from 'url';

const __dirname = dirname(fileURLToPath(
    import.meta.url));



const controller = {}


controller.add = (req, res) => {

    var photo_1 = {
        data: ""
    }

    if (req.files) {
        var photo_1 = req.files.photo;
    }

    const blog1 = new Blog({
        name: req.body.name || "Undefined",
        surname: req.body.surname || "Undefined",
        age: req.body.age || null,
        address: req.body.address || "Undefined",
        code: {
            code1: req.body.code1 || null
        },
        zip: req.body.zip || "Undefined",
        photo: {
            data: photo_1.data.toString("base64") || "Undefined",
            contentType: photo_1.mimetype || "Undefined",
            photoName: photo_1.name || "Undefined"
        }
    })
    blog1.save()
        .then((result) => {
            // console.log("veri gönderildi", result)
            res.cookie('checkAdd', "true", {
                //   expires: new Date(Date.now()+5000)
                //  maxAge: 10000
                //  res.clearCookie('name', { path: '/admin' });
            });
            const {
                cookies
            } = req
            //  console.log("req.cookies:", cookies)
            res.redirect("/html/Settings/Add")
        }).catch((err) => {
            res.write("Error from controller.js ||||   " + err.toString())
            res.end("")
            console.log("Error from controller.js.", err)

        })
}
controller.show = (req, res) => {
    console.log("showAll ready.")
    Blog.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.write("hata")
    }).finally(() => {
        res.end("")
    })
}

controller.show_id = (req, res) => {
    console.log("show ready")
    Blog.findOne({
            _id: req.params.id
        }).then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.write("contoller.js 95 :", error.message)
        }).finally((result) => {
            res.end("")
        })

}

controller.delete_id = (req, res) => {
    console.log("delete ready")
    Blog.findByIdAndDelete(req.params.id).then((result) => {
        res.send(result)
    }).catch((error) => {
        res.send("controller 100")
    }).finally(() => {
        res.end("")
    })
}

controller.insertFile = (req, res) => {
    fs.readFile(__dirname + "/../Uploads/Profile.jpg", "base64", function (err, data) {
        if (err) {
            res.send(err.message)
        } else {
            console.log(Buffer.from(data, "base64"))
            res.write(Buffer.from(data, "base64").toString("base64"))
            res.end("")


            // fs.writeFile(__dirname + '/../Uploads/deneme2.mp3', data, "base64",function (err) {
            //     if (err) {
            //         console.error(err)
            //     } else {
            //         console.log("Ok");
            //     }
            // })
        }

    })


}

controller.insertFile2 = (req, res) => {
    // const time = new Date()
    // if (req.files) {
    //     let {
    //         photo
    //     } = req.files
    //     console.log(photo);
    //     photo.mv(__dirname + "/../../frontend/Uploads/" + time.getFullYear() + "_" + (time.getMonth() + 1) + "_" + time.getDate() + "_" + time.getHours() + "_" + time.getMinutes() + "_" + time.getSeconds() + "_" + photo.name, function (err) {
    //         if (err) {
    //             console.log(err);
    //         }
    //     })
    // }
    // res.end("Ok")
}


//.........................................Speech to Text......................................//

controller.setSpeech = (req, res) => {

    const blog2 = new Blog2({
        topic: req.body.topic || "Undefined",
        userSpeech: req.body.userSpeech || "Undefined",
        path: req.body.path || "Undefined"
    })
    blog2.save()
        .then((result) => {
            // console   console.log(result)
            res.send("OK")
        })
        .catch((err) => {
            console.log("Hata controller 162 ||| " + err.toString())
        })
        .finally(() => {
            res.end("")
        })

}

controller.getSpeech = (req, res) => {
    Blog2.find({}).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.end("ERROR: " + err)
    }).finally(() => {
        res.end("")
    })

}

controller.getSpeechSome = (req, res) => {
    Blog2.find({}, "path topic createdAt").then((result) => {
        res.send(result);
    }).catch((err) => {
        res.end("ERROR: " + err)
    }).finally(() => {
        res.end("")
    })

}

controller.getSpeechId = (req, res) => {
    console.log("getSpeechId ready");
    Blog2.findOne({
        path: req.params.id
    }).then((result) => {
        res.send(result);
        res.end("")
    }).catch((err) => {
        res.write(err.message.toString());
        res.end("")
    })
}

controller.deleteSpeechId = (req, res) => {
    console.log("deleted one speech");
    Blog2.findOneAndDelete({
            path: req.params.id
        }).then((result) => {
        let dir = __dirname + `/../../frontend/Uploads/SpeechToText/${result.path}`
        fs.rm(dir, {
            recursive: true,
            force: true
        }, (err) => {
            if (err) {
                console.log("Error removing audio file controller 212", err)
            }
        });



        res.send("Ok");
    }).catch((err) => {
        res.send(err)
    }).finally(() => {
        res.end("")
    })
}

controller.deleteSpeechAll = (req, res) => {
    Blog2.find().then((result) => {
        result.map((result1) => {
            Blog2.findByIdAndDelete(result1._id).then((result2) => {

                let dir = __dirname + `/../../frontend/Uploads/SpeechToText/${result2.path}`
                fs.rm(dir, {
                    recursive: true,
                    force: true
                }, (err) => {
                    if (err) {
                        console.log("Error removing audio file controller 212", err)
                    }
                });
            }).catch((err) => {
                res.send(err)
            }).finally(() => {
                res.end("")
            })
        })
        res.send("Ok")
    }).catch((err) => {
        res.end("ERROR: " + err)
    }).finally(() => {
        res.end("")
    })
}


controller.saveAudio = (req, res) => {
    let file = req.files
    let file2 = req.body


    if (!fs.existsSync(`${__dirname}/../../frontend/Uploads/SpeechToText/${file2.folderId}`)) {
        fs.mkdirSync(`${__dirname}/../../frontend/Uploads/SpeechToText/${file2.folderId}`)
    }



    fs.writeFile(`${__dirname}/../../frontend/Uploads/SpeechToText/${file2.folderId}/${file2.id}.mp3`, file.source.data, "base64", function (err) {
        if (err) {
            console.log("hata", err);
        } else {

        }
    })


    res.send("Ok")
    res.end("")
}

controller.getAudio = (req, res) => {
    let audioSpeech = fs.readFileSync(`${__dirname}/../../frontend/Uploads/SpeechToText/${req.params.folderId}/1641714305114.mp3`,"base64");
    console.log(Buffer.from(audioSpeech, "base64"))
}




export default controller;