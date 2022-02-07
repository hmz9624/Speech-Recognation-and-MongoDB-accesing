import {
    AddData
} from "./AllComponents_model.js";


export default class Controller {

    constructor() {
        this.LoadData()
    }

    LoadData() {
        const find = this;
        $.get(`/settings/show`, function (data, status) {
            find.AddDataFrom(data);
            console.log("Load Data from Mongo Db:", status)
            find.ShowNumberOfItem(data.length)
        })
    }

    ShowNumberOfItem(item) {
        var number = 0;
        var interval = setInterval(function () {
            $('#numberOfItem').html(number);
            if (number >= item) {
                clearInterval(interval)
            }
            number++;
        }, 40);
    }

    AddDataFrom(data) {
        $("#AddComponents").html("")
        var acc = 0;
        data.map(item => {
            if (acc > 100) {
                return
            }
            AddData(item)
            acc++;
        })
    }

    DeleteAllData() {
        $.get("/settings/show", function (data, status) {
            data.forEach((item) => {
                $.get("/settings/delete/" + (item._id), function (data, status) {
                    console.log("Status: ", status)
                    console.log("Deleting : ", data)
                })
                $(`#${item._id}`).hide(1000)
            })
        })
    }

    ConsoleShowDatas() {
        $.get(`/settings/show`, function (data, status) {
            console.log(data)
            console.log(status)
        })
    }



}