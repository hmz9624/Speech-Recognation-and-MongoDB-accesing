export default class InsertModel {
    constructor() {

    }

    speechList = (topic, path, date) => {
        let list = `    <li id="list">
                    <div id="listOneElement" class="listOneElement">
                        <div id="topicUp" class="class1" style="width:23%">
                            <label for="">Topic:</label>
                            <div class="textEl" id="topic">${topic}</div>
                        </div>
                        <div id="pathUp" class="class1" style="width:21%">
                            <label for="">Path:</label>
                            <div class="textEl" id="path">${path}</div>
                        </div>
                        <div id="dateUp" class="class1" style="width:40%">
                            <label for="">Date:</label>
                            <div class="textEl" id="date">${date}</div>
                        </div>
                        <div class="class2" id="divButtons" style=" width: 16%">
                            <button  style="width:45%" type="button" class="btn btn-primary openOneSpeech">Open</button>
                            <button style="margin-left:2px ; width:45%;" type="button"
                                class="btn btn-danger deleteOneSpeech">Delete</button>
                        </div>

                    </div>
                </li>`

        return list
    }


    speechOnes = (model,pathId,modelNumber) => {
        let oneSpeech = `<tr id="${model.time}_Speech">
                        <th class="Number" scope="row">${modelNumber}</th>
                        <td class="Id" id="speechId">${model.time}</td>
                        <td class="User" id="speechUser">${model.whichUser}</td>
                         <td class="audio" style="width:200px; " scope="col">
                         <audio audio audio audio controls src = "/Uploads/SpeechToText/${pathId}/${model.time}.mp3" >
                         </audio>
                        </td>
                        <td class="Speech" id="speechText">${model.text}</td>
                    </tr>`
        return oneSpeech
    }
}