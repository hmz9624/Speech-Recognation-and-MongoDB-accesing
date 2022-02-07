import {alertToggle} from './globalFunction.js';
//import Uppy from '/node_modules/@uppy/core/types/index.d.ts'



$(document).ready(function () {

    // Cookies.set("alertAdded","true",{expires:(1/(24 * 60*12))})
    // Cookies.remove("deneme1")

    let {
        checkAdd
    } = Cookies.get();

    if (checkAdd && checkAdd === "true") {
        alertToggle("Component added successfully", "1rem")
        console.log("Component successfully added")
        Cookies.set("checkAdd", "false");
    } else {
        console.log("There was no registered component")
    }


    // $('#customFile').change(function () {
    //     var file = $('#customFile')[0].files[0].name;
    //     $(this).prev('label').text(file);
    // });

    // $("input[type='reset']").click(function () {
    //     $('#customFile').prev('label').text("Choose file")
    // })







})