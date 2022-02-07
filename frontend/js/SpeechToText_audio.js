export default class Audio {
    constructor() {
        this.streamCurrent
        this.allAudios = []
        this.audioChunks = []
        this.running = false
        this.rec
        this.currentData
        this.lastAudioElement
        this.currentTime
    }


    startAudioMedia() {
        navigator.mediaDevices.getUserMedia({
                audio: true
            })
            .then(stream => {
                this.audioChunks = []
                this.handlerFunction(stream)
                this.streamCurrent = stream;
                this.rec.start();
            })
    }

    handlerFunction(stream) {
        this.rec = new MediaRecorder(stream);
        this.startRecEvents(this.rec, this)
    }



    startAudioRecording() {
        if (!this.running) {
            this.startAudioMedia()
            this.running = true;
        } else {
            //  console.log("it still running.");
        }
    }

    stopAudioRecording() {
        if (this.running) {
            this.running = false;
            this.rec.stop();
            let tracks = this.streamCurrent.getTracks()
            tracks.forEach(track => {
                track.stop();
            })
        } else {
            console.log("it is not running");
        }
    }

    getAudioRecording() {
       return this.allAudios
    }

    startRecEvents(rec, this2) {

        $(rec).on("dataavailable", function (event) {
            this2.currentData = event.originalEvent.data
            this2.audioChunks.push(this2.currentData);
            if (rec.state == "inactive") {
                let blob = new Blob(this2.audioChunks, {
                    type: 'audio/mpeg',
                });
                setTimeout(function () {
                    if (!(this2.lastAudioElement == $("#tbody tr:nth-last-child(1) audio")[0])) {
                        this2.lastAudioElement = $("#tbody tr:nth-last-child(1) audio")[0]
                        let lastId = $("#tbody tr:nth-last-child(1) td:nth-last-child(4)").html()
                        blob.id = lastId;
                        $("#tbody tr:nth-last-child(1) audio").attr("src", URL.createObjectURL(blob))
                        this2.allAudios.push(blob);
                        window.scrollTo(0, document.body.scrollHeight);
                    }
                }, 350)

            }
        })

        $(rec).on("start", () => {
            // console.log("Rec Started");
        })

        $(rec).on("stop", () => {
            // console.log("Rec Finished");
        })
    }
}