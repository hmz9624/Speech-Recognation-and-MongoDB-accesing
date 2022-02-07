import ModelControl from "./AllSpeech_modelControl.js"
const modelControl = new ModelControl()

$(document).ready(function () {


    modelControl.firstReadyFunction(undefined, undefined)

    $(document).on("click", ".openOneSpeech", function (e) {
        let pathId = $($(e.target).parent().parent()[0]).children("div").eq(1).children("div").html()
        modelControl.showSelectedSpeech(pathId)
        $(".listOneElement").css("border", "")
        $($(e.target).parent().parent()[0]).css("border", "2px solid red")
    })

    $(document).on("click", ".deleteOneSpeech", function (e) {
        modelControl.deleteOneSpeech(e)
        $(e.target).parent().parent().parent().hide(1000)
        $("#tbody").html("")

    })

    $(document).on("click keyup", function (e) {
        let targetVal = $(e.target).attr("id");
        if (targetVal == "findInput") {
            let startNumberInput = $("#startNumberInput").val();
            let endNumberInput = $("#endNumberInput").val();
            modelControl.firstReadyFunction(startNumberInput, endNumberInput)
        } else if (targetVal == "resetInput") {
            modelControl.firstReadyFunction()
            $("#startNumberInput").val("");
            $("#endNumberInput").val("");
            $("#searchInputText").val("");
        } else if (targetVal == "topicInput") {
            modelControl.sortSpeechListbyTopic()
        } else if (targetVal == "dateInput") {
            modelControl.sortSpeechListbyDate()
        } else if (targetVal == "clearInput") {
            $("#searchInputText").val("");
            modelControl.firstReadyFunction()
        } else if (targetVal == "searchInputText") {
            let searchText = $("#searchInputText").val()
            $(`#onlyNameOfSpeech li:not(:icontains(${searchText}))`).css("display", "none");
            $(`#onlyNameOfSpeech li:icontains(${searchText})`).css("display", "block");

        }
    })


    $(".audioIcon").click(function (e) {

        try {
            modelControl.speechAudios = $("audio")
            modelControl.audioFunction[$(e.target).attr("id")]()
        } catch (error) {
            console.log("Hata AllSpeech_index 56 || ", error);
            modelControl.audioFunction.continue()
        }

    })

    $("#searchInputSpeech").on("keyup change ", function (e) {
        let searchText2 = $("#searchInputSpeech").val()
        console.log(searchText2);
        if (searchText2 !="") {
            $(`#tbody tr:not(:icontains(${searchText2}))`).css("border", "");
            $(`#tbody tr:icontains(${searchText2})`).css("border", "4px solid rgb(231, 60, 60)");
        } else {
            $("#tbody tr").css("border", "");
        }
    })


















})

jQuery.expr[':'].icontains = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};