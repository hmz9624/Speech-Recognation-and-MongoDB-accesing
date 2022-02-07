import Control from "./SpeechToText_control.js"

import {
    RecognitionController
} from "./SpeechToText_RecognitionController.js"

import {
    alertToggle
} from "./globalFunction.js"


$(document).ready(function () {
    let control = new Control(false);

    $(document).on("keyup keydown", function (e) {
        try {
            control[`${e.type}_${e.which}`]()
        } catch (error) {
            //  console.log(`${e.type}_${e.which}`);
        }
    })


    $("#button_submit").click(() => {
        let folderId = Date.now()
        let topic = $("#submitText").val()
        let userSpeechJson = RecognitionController.GetUsers()
        if (userSpeechJson.User1_Speech.length != 0 || userSpeechJson.User2_Speech.length != 0) {
            let userSpeech = JSON.stringify(userSpeechJson)
            $.post("/settings/setSpeech", {
                topic: topic || "deneme",
                userSpeech: userSpeech,
                path: folderId,
            }, function (data) {
                RecognitionController.deleteAllSpeech()
                $("#tbody").html("")
                alertToggle("Speech has submitted.")

            })

            //_______________________________________________________________________________________________//

            let allSpeech = control.getSpeech()
            allSpeech.map((speech) => {
                var formData = new FormData()
                formData.append("folderId", folderId)
                formData.append('id', speech.id)
                formData.append('source', speech)

                $.ajax({
                    url: "/settings/saveAudio",
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        console.log("Saved");
                    }
                });
            })

        } else {
            alertToggle("Speech must receive at least 1 data.")
        }
    })


    $("#submitText").on("keypress", function (e) {
        if (e.which === 13) {
            $("#button_submit").click();
            $("#submitText").val("")
                $("#submitText").blur();
        }
    })

})