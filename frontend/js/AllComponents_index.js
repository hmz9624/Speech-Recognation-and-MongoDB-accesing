import Controller from "./AllComponents_control.js"
import {
    alertToggle,rotate
} from "./globalFunction.js";

const controller = new Controller()

$(document).ready(function () {

    $("#RefreshData").click(() => {
        controller.LoadData();
    })

    $("#DeleteAllData").click(() => {
        controller.DeleteAllData();
        alertToggle("All Data deleted successfully")
        
    })

    $("#Console").click(() => {
        controller.ConsoleShowDatas()
        alertToggle("Open Console Please")
    })

    let bool1 = false;
    $("#ShowItems").click(() => {
         $(".slideAll").stop()
        if (bool1) {
            $(".slideAll").slideDown("slow");
            rotate(0)
        } else {
            $(".slideAll").slideUp("slow")
            rotate(180)
        }
        bool1 = !bool1
    })



})