import AddingModel from "./SpeechToText_model.js"
const AddingModelNew = new AddingModel();

const recognition = new webkitSpeechRecognition()

let [User1_Speech, User2_Speech, myself, user, currentTime] = [
    [],
    [], false, "", ""
]

recognition.continuous = true
recognition.lang = "tr-TR"
recognition.interimResults = false
recognition.maxAlternatives = 1;

let RecognitionEventListener = {
    start: function (event) {
        if (myself) {
            //     console.log("Recognition has started successfully...");
            myself = false
        } else {}
    },

    end: function (event) {
        if (!myself) {
            recognition.start()
            //    console.log("%c Waiting for recognition...", "color:blue");
        } else {
            //  console.log("Recognition has ended successfully...");
            myself = false
        }
    },

    error: function (event) {
        //   console.log('Speech recognition error detected: ' + event.error);
        myself = true
    },

    result: function (event) {
        if (user == "User1") {
            userAction(event, "User1");
        } else if (user == "User2") {
            userAction(event, "User2");
        }
    },

    nomatch: function (event) {
        //   console.log('Speech not recognized');
    }
}

$(recognition).on("result start end error nomatch", (event) => {
    let router = event.originalEvent.type
    RecognitionEventListener[router](event.originalEvent)
})

let RecognitionController = {
    StartSpeechRecognition: (userId) => {
        user = userId;
        myself = true
        recognition.start()
    },
    StopSpeechRecognition: () => {
        myself = true
        recognition.stop()
    },
    GetUsers: () => {
        let Users = {
            "User1_Speech": User1_Speech,
            "User2_Speech": User2_Speech
        }
        return Users
    },
    GetUser1: () => {
        return User1_Speech
    },
    GetUser2: () => {
        return User2_Speech
    },
    deleteAllSpeech: () => {
        User1_Speech = [];
        User2_Speech = [];
    }

}

function userAction(event, user) {
    let newEvent = event.results[event.resultIndex][0]
    let [text, resultIndex, confidence] = [newEvent.transcript, event.resultIndex, newEvent.confidence]
    let model = {
        text: text,
        confidence: confidence,
        resultIndex: resultIndex,
        whichUser: user,
        time: Date.now()
    }
    let UserPush = {
        User1: (user) => {
            User1_Speech.push(model)
            //     console.log(User1_Speech)
            AddingModelNew.Add_User1(model)
        },
        User2: (user) => {
            User2_Speech.push(model)
            //     console.log(User2_Speech);
            AddingModelNew.Add_User2(model)
        }
    }
    UserPush[user](user)
}

export {
    RecognitionController
}