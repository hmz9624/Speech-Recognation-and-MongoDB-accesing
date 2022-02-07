import express from 'express'
import controller from '../controller/controller.js'
import controller2 from '../controller/controller2.js'

const router1 = express.Router();
const router2 = express.Router();


router1.post("/add", controller.add)
router1.get("/show", controller.show)
router1.get("/show/:id", controller.show_id)
router1.get("/delete/:id", controller.delete_id)
router1.post("/insertFile", controller.insertFile)
router1.post("/insertFile2", controller.insertFile2)

router1.post("/setSpeech", controller.setSpeech)
router1.get("/getSpeech", controller.getSpeech)
router1.get("/getSpeechSome", controller.getSpeechSome)
router1.get("/getSpeechId/:id", controller.getSpeechId)
router1.get("/deleteSpeechId/:id", controller.deleteSpeechId)
router1.get("/deleteSpeechAll", controller.deleteSpeechAll)

router1.post("/saveAudio", controller.saveAudio)
router1.get("/getAudio/:folderId", controller.getAudio)


//***************************** */

router2.get("/", controller2.portfolio)
router2.get("/Applications/SpeechToText", controller2.SpeechToText)
router2.get("/Applications/AllSpeech", controller2.AllSpeech)
router2.get("/Applications/FaceID", controller2.FaceID)
router2.get("/AllComponents", controller2.AllComponents)
router2.get("/Settings/Add", controller2.Add)
router2.get("/Settings/Delete", controller2.Delete)
router2.get("/Settings/Update", controller2.Update)
router2.get("/Contact", controller2.Contact)


export {
    router1,
    router2
};