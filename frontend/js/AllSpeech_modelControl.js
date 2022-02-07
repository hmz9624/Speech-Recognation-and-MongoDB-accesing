import InsertModel from "./AllSpeech_insertModel.js"
const insertModel = new InsertModel();

import CheckInput from "./AllSpeech_checkInput.js";
const checkInput = new CheckInput();

export default class ModelControl {
    constructor() {
        this.modelNumber = 0;
        this.speechAudios = []
        this.runningSpeechNumber = 0
        this.runningNow = false
        this.myself = false
    }

    firstReadyFunction = (start, end) => {
        $("#onlyNameOfSpeech").html("")
        let this2 = this;
        $.get("/settings/getSpeechSome", function (data, status) {
            let startNumber = checkInput.checkStart(start, data.length) || 0
            let endNumber = checkInput.checkEnd(startNumber, end, data.length) || data.length
            startNumber = parseInt(startNumber);
            endNumber = parseInt(endNumber)

            for (let i = startNumber; i < endNumber; i++) {
                this2.showSpeechList(data[i].topic, data[i].path, data[i].createdAt)
            }

        })
    }

    showSpeechList = (topic, path, date) => {
        let list = insertModel.speechList(topic, path, date)
        $("#onlyNameOfSpeech").append(list)
    }

    sortSpeechListbyDate = () => {
        let htmlLists = $("#onlyNameOfSpeech li")
        htmlLists.sort(function (a, b) {
            return $(a).children().children().eq(1).children("div").html() - $(b).children().children().eq(1).children("div").html()
        })
        $("#onlyNameOfSpeech").html("")
        for (var i = 0; i < htmlLists.length; i++) {
            $("#onlyNameOfSpeech").append(`<li id="list"> ${$(htmlLists[i]).html()} </li>`);
        }
    }

    sortSpeechListbyTopic = () => {
        let htmlLists = $("#onlyNameOfSpeech li")
        htmlLists.sort(function (a, b) {
            var nameA = $(a).children().children().eq(0).children("div").html().toUpperCase(); // ignore upper and lowercase
            var nameB = $(b).children().children().eq(0).children("div").html().toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        })
        $("#onlyNameOfSpeech").html("")
        for (var i = 0; i < htmlLists.length; i++) {
            $("#onlyNameOfSpeech").append(`<li id="list"> ${$(htmlLists[i]).html()} </li>`);
        }
    }

    showSelectedSpeech = (pathId) => {
        this.modelNumber = 0;
        let this2 = this;
        $("#tbody").html("")
        $.get("/settings/getSpeechId/" + pathId, function (data, status) {
            if (status == "success") {
                this2.gettingSpeechSuccess(this2, data, pathId)
            } else {
                console.log("Error getSpeechId", status);
            }
        })
    }

    gettingSpeechSuccess = (this2, data, pathId) => {
        let dataSpeech = JSON.parse(data.userSpeech)
        let mixedSpeech = [...dataSpeech.User1_Speech, ...dataSpeech.User2_Speech]
        mixedSpeech.sort((a, b) => {
            return a.time - b.time
        })
        mixedSpeech.map((speechOne) => {
            if (speechOne.whichUser === "User1") {
                this2.appendSpeech(speechOne, "rgb(185,164,242)", pathId)
            } else {
                this2.appendSpeech(speechOne, "rgb(121,208,79)", pathId)
            }
        })
        this.startAudioEvent()
    }

    appendSpeech = (model, rgb, pathId) => {
        let this2 = this;
        let speechOne = insertModel.speechOnes(model, pathId, this2.modelNumber)
        $("#tbody").append(speechOne)
        $(`#${model.time}_Speech`).css("background-color", rgb)
        this2.modelNumber += 1;
    }

    deleteOneSpeech = (e) => {
        let pathId = $($(e.target).parent().parent()[0]).children("div").eq(1).children("div").html()
        console.log(pathId);
        $.get(`/settings/deleteSpeechId/${pathId}`, function (data, status) {
            console.log(data);
        })
    }

    audioFunction = {

        play: () => {
            if (!this.runningNow) {
                let this2=this
                $("#play").css("display", "none")
                $("#continue").css("display", "block")
                this.myself = true
                let pathId=$(this.speechAudios[this.runningSpeechNumber]).attr("src");
                jQuery.ajax({
                    'url': `${pathId}`,
                    type: 'get',
                    data: {},
                    statusCode: {
                        200: function (response) {

                        },
                        404: function (response) {
                            this2.runningSpeechNumber += 1;
                            this2.audioFunction.play()
                        }
                    },
                    complete: function (xhr, statusText) {
                       // console.log(xhr.status);
                    },
                    success: function () {
                        this2.speechAudios[this2.runningSpeechNumber].play()
                    }
                });
                
            }
        },
        continue: () => {
            $("#play").css("display", "block")
            $("#continue").css("display", "none")
            this.speechAudios[this.runningSpeechNumber].pause()
            this.runningNow = false
        },
        reset: () => {
            this.speechAudios[this.runningSpeechNumber].pause()
            this.speechAudios[this.runningSpeechNumber].currentTime = 0;
            this.audioFunction.continue()
            this.runningSpeechNumber = 0
            this.runningNow = false
        },
        resetAll: () => {
            for (var i = 0; i < this.speechAudios.length; i++) {
                this.speechAudios[i].pause()
                this.speechAudios[i].currentTime = 0
            }
            this.audioFunction.reset()
        },
        soundOn: () => {
            $("#soundOn").css("display", "none")
            $("#soundOff").css("display", "block")
            for (var i = 0; i < this.speechAudios.length; i++) {
                this.speechAudios[i].volume = 0.0
            }
        },
        soundOff: () => {
            $("#soundOn").css("display", "block")
            $("#soundOff").css("display", "none")
            for (var i = 0; i < this.speechAudios.length; i++) {
                this.speechAudios[i].volume = 1.0
            }
        }
    }

    startAudioEvent = () => {
        let this2 = this
        $("audio").on("play", function (e) {
            if (this2.myself == true) {
                this2.myself = false;
                this2.runningNow = true
            } else {
                this2.myself = true;
                this2.audioFunction.reset()
                this2.runningNow = true
            }
        })


        $("audio").on("ended", function () {
            this2.runningNow = false

            if ((this2.runningSpeechNumber < this2.speechAudios.length - 1) && (!this2.myself)) {
                this2.runningSpeechNumber += 1;
                this2.audioFunction.play()
            } else if ((this2.runningSpeechNumber == (this2.speechAudios.length - 1)) && (!this2.myself)) {
                this2.audioFunction.reset()
            } else {
                this2.myself = false
            }
        })

        $("audio").on("pause", function () {
            //   this2.runningNow = false
        })
    }

}