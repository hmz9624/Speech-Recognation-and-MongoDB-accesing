import {
    alertToggle
} from "./globalFunction.js"

import {
    RecognitionController
} from "./SpeechToText_RecognitionController.js"

import Audio from "./SpeechToText_audio.js"
let audio = new Audio()

export default class Control {
    constructor(recordingState) {
        this.recordingState = recordingState
        this.Users = []
        this.User1 = {}
        this.User2 = {}
        this.recording = false
        this.currentTime
    }

    keydown_97 = () => {
         this.recordingState && (audio.startAudioRecording(),RecognitionController.StartSpeechRecognition("User1"))
         this.recordingState && $("#User1").css("background-color", "rgb(231, 85, 80)") // User1 speak
    }

    keyup_97 = () => {
        this.recordingState && $("#User1").css("background-color", "rgb(119, 212, 200)") //User1 stopped
        this.recordingState && (RecognitionController.StopSpeechRecognition(), audio.stopAudioRecording())
    }

    keydown_99 = () => {
        this.recordingState && (audio.startAudioRecording(), RecognitionController.StartSpeechRecognition("User2"))
        this.recordingState && $("#User2").css("background-color", "rgb(231, 85, 80)") // User2 speak
    }

    keyup_99 = () => {
        this.recordingState && $("#User2").css("background-color", "rgb(119, 212, 200)") // User2 stopped
        this.recordingState && (RecognitionController.StopSpeechRecognition(), audio.stopAudioRecording())
    }

    keydown_103 = () => { // Recording started
        this.recordingState == true ? alertToggle("Recording started already...", "7rem") : (this.recordingState = true,
            $("#recordingImg").css("display", "block"), $("#button_div").css("display", "none"), alertToggle("Recording process started successfully", "7rem"))
        // console.log("Recording started.......... ")
    }

    keydown_105 = () => { // Recording finished
        this.recordingState == false ? alertToggle("Recording stopped already.", "1rem") : (this.recordingState = false,
            $("#recordingImg").css("display", "none"), $("#button_div").css("display", "block"), alertToggle("Recording finished successfully", "1rem"),setTimeout(function() {$("#submitText").focus()},50))
        RecognitionController.StopSpeechRecognition()
        //  console.log("Recording finished..........")
        window.scrollTo(0, 0)
    }

    keydown_101 = () => {
        this.Users = [...RecognitionController.GetUser1(), ...RecognitionController.GetUser2()].sort((a, b) => a.time - b.time)
        //   console.log("All Users:", this.Users);
        console.log(audio.getAudioRecording());
    }

    keydown_100 = () => {
        this.User1 = RecognitionController.GetUser1()
        //    console.log("User1:", this.User1);
    }

    keydown_102 = () => {
        this.User2 = RecognitionController.GetUser2()
        //   console.log("User2:", this.User2);
    }

    getSpeech = () => {
       return audio.getAudioRecording()
    }

}