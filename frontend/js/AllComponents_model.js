export function AddData(data) {

    try {
        $("#AddComponents").append(`
        <h4 style="display:none" >${data._id}</h4>
<div; margin-left: 10px ; margin-bottom: 10px">
    <div id="${data._id}" class="card" style="width: 100%">
        <div  class = "card-header" id = "${data._id}_button" style = "background-color:rgb(145, 216, 248)">
            <strong style="color:red">Id</strong>:${data._id}
            <img id="img_${data._id}" class="img_1" src = "/lib/down-chevron (1).png"
            alt = "resim"
            width = "42"
            height = "42" style="position:absolute; left:50% ; top:3px" >
            <div style = "position:absolute; right:5% ; top:3px" >
                <strong style="color:red">Created Date:</strong>:${data.createdAt}
            </div>
        </div>
        <div class="card-body">
            <div class="slideAll" id="${data._id}_slide" style="display:block">
             <h5 class="card-title" style="font-weight:bold">Personal Information</h5>
             <div style="display:flex">
                <div id="profil" style="width:200px; height:230px; background-color:white">
                 <img style="border:2px solid blue ; max-width:200px ; max-height:200px " id="profil_${data._id}" src="data:image/png;base64,${data.photo.data}" alt="Red dot" />
                </div>

                  <div id="waveDiv${data._id}" style = "width:840px; margin-left:30px; margin-top:5px " >
                  <div  id="waveform${data._id}"  width="900px" height="160px" style="margin-left:10px" ></div>
                  <button id="play" class="btn btn-primary" onclick="wavesurfer.playPause()">Play/Pause</button>
                  <button id="stop" class="btn btn-danger" onclick="wavesurfer.stop()">Reset</button>
                  </div>    
             </div>
             
                <table>
                    <tr>
                        <td>Name</td>
                        <td>${data.name}</td>
                        <td>Surname</td>
                        <td>${data.surname}</td>
                    </tr>
                    <tr>
                        <td>Photo</td>
                        <td>${data.photo.photoName}</td>
                        <td>Selected</td>
                        <td>${data.zip}</td>
                    </tr>
                </table>
            </div>
            

            </p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Other Properties
            </button>
            <button id="deleteItem" class="btn btn-danger" onclick="DeleteItem('${data._id}')">Delete Data</button>
        </div>
    </div>
    </div>
    <br>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Item Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Id: ${data._id}<br>
                    Website: ${data.name}<br>
                    Photo: ${data.age}<br>
                    Geo Lat: ${data.code.code1}<br>
                    Geo Lng: ${data.code.code1}<br>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script>
    function DeleteItem(item) {
        $.get("/settings/delete/" + item, function (data, status) {
            console.log("status:", status)
            console.log("Deleted Item", data)
            $("#" + item).hide(1000)
            var x = $('#numberOfItem').html();
            $('#numberOfItem').html(parseInt(x) - 1)

        })
    }

    $("#${data._id}_button").on("click", function (e) {
        $("#${data._id}_slide").stop()
        if ($("#${data._id}_slide").css("display") === "none") {
            rotate(0, "#img_${data._id}")
        } else {
            rotate(180, "#img_${data._id}")
        }
        $("#${data._id}_slide").slideToggle("slow")
    })

    function rotate(deg, id) {
         $(id).stop()
        $(id).animate({
            deg: deg
        }, {
            duration: 500,
            step: function (now) {
                $(this).css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        });
    }

        var wavesurfer = WaveSurfer.create({
        container: '#waveform${data._id}',
        waveColor: 'violet',
        progressColor: 'purple',
        barWidth: 0.1,
        normalize: true
        });
        
    wavesurfer.load('/Uploads/mzk.mp3');
    wavesurfer.setHeight(150)
    </script>
            `)
    } catch (error) {
        console.log(error)
    }
}