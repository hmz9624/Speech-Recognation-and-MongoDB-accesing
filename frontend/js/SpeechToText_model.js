export default class AddingModel {
    constructor() {
        this.modelNumber = 0;
    }

    Add_User1 = (model) => {
        this.AddModel_Users(model, "rgb(185,164,242)")
    }
    Add_User2 = (model) => {
        this.AddModel_Users(model, "rgb(121,208,79)")
    }
    AddModel_Users = (model, rgb) => {
        this.Check_Input(model).then((model) => {
            $("#tbody").append(`<tr id="${model.time}">
                        <th class="Number" scope="row">${this.modelNumber}</th>
                        <td class="Id" id="speechId">${model.time}</td>
                        <td class="User" id="speechUser">${model.whichUser}</td>
                         <td class="audio" style="width:200px; " scope="col">
                         <audio controls></audio>
                        </td>
                        <td class="Speech" id="speechText">${model.text}</td>
                    </tr>`)
            $(`#${model.time}`).css("background-color", rgb)
            this.modelNumber += 1;
        })
    }

    Check_Input = (model) => {
        return new Promise(function (resolve, reject) {
            $.get("/lib/AI_response.json", function (data, status) {
                if (Object.keys(data).includes(model.text.toLocaleLowerCase('tr-TR'))) {
                    model.text = data[model.text.toLocaleLowerCase('tr-TR')]
                    resolve(model);
                } else if (model.text.toLocaleLowerCase('tr-TR') == "haberler") {
                    var windowObjectReference;
                    function openRequestedPopup() {
                        windowObjectReference = window.open(
                            "https://www.haberturk.com/",
                            "DescriptiveWindowName",
                            "left=100,top=100,width=900,height=500"
                        );
                    }
                    openRequestedPopup()

                    var e = jQuery.Event("keydown");
                    e.which = 105; // # Some key code value
                    $(document).trigger(e);

                    resolve(model);
                } else {
                    resolve(model);
                }
            })
        })
    }

}