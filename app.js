class Drumkit {
    constructor() {
        //Creating different constructors
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = "./sounds/kick-808.wav";
        this.currentSnare = "./sounds/snare-acoustic02.wav";
        this.currentHihat = "./sounds/hihat-808.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }

    activePad() {
        //Adding the active class to the pad clicked
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //Looping over the pads
        activeBars.forEach((bar) => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            // Check if pads are active
            if(bar.classList.contains("active")){
                //Checking for the sound
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });

        this.index++;
    }
    start() {
        const interval = (60/this.bpm) * 1000;
        //Check if its playing
        if (!this.isPlaying) {
            // here is to add interval
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval); 
        } else {
            ///here is to remove the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn() {
        if(!this.isPlaying) {
            //play Button changes to Stop while playing
            this.playBtn.innerText = "Start";
            this.playBtn.classList.add("active");
        } else {
            //play button changes to Start while not playing
            this.playBtn.innerText= "Stop";
            this.playBtn.classList.add("active");
        }
    }
    changeSound(event) {
        const selectedName = event.target.name;
        const selectedValue = event.target.value;

        switch(selectedName) {
            case "kick-select":
                this.kickAudio.src = selectedValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectedValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectedValue;
                break;
        }
    }
    mute(event) {

        const muteindex = event.target.getAttribute("data-track");
        event.target.classList.toggle("active");
        if(event.target.classList.contains("active")) {
            switch(muteindex) {
                //Setting the volume to zero and changing it to Mute Icon.
                case "0":
                    this.kickAudio.volume = 0;
                    event.target.querySelector(".high").classList.replace("show", "hide");
                    event.target.querySelector(".xmark").classList.replace("hide", "show");
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    event.target.querySelector(".high").classList.replace("show", "hide");
                    event.target.querySelector(".xmark").classList.replace("hide", "show");
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    event.target.querySelector(".high").classList.replace("show", "hide");
                    event.target.querySelector(".xmark").classList.replace("hide", "show");
                    break;
            }
        } else {
            switch(muteindex) {
                //Setting the volume to zero and changing it to Speaker Icon.
                case "0":
                    this.kickAudio.volume = 1;
                    event.target.querySelector(".high").classList.replace("hide", "show");
                    event.target.querySelector(".xmark").classList.replace("show", "hide");
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    event.target.querySelector(".high").classList.replace("hide", "show");
                    event.target.querySelector(".xmark").classList.replace("show", "hide");
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    event.target.querySelector(".high").classList.replace("hide", "show");
                    event.target.querySelector(".xmark").classList.replace("show", "hide");
                    break;
            }
        }
    }
    changeTempo(event){
        //Change the tempo and also then TempoText
        const tempoText = document.querySelector(".tempo-nr");
        this.bpm = event.target.value;
        tempoText.innerText = event.target.value; 
    }
    updateTempo() {
        //Update the Value of the Tempo
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

//creating drumkit
const drumKit = new Drumkit();

// All Event Listeners
drumKit.pads.forEach(pad => {
    //Adding Animations to the pad when clicked
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function() {
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click", () => {
    //Click functions to call when the clicked button is pressed
    drumKit.start();
    drumKit.updateBtn();
});

drumKit.selects.forEach(select => {
    //Click function to change Sound
    select.addEventListener("change", (event) => {
        drumKit.changeSound(event);
    });
})

drumKit.muteBtns.forEach(btn => {
    //Calling the mute function when the muteBtn is clicked.
    btn.addEventListener("click", (event) => {
        drumKit.mute(event);
    });
})

drumKit.tempoSlider.addEventListener("input", (event) => {
    // Adding an input event listener for the range.
    drumKit.changeTempo(event);
})

drumKit.tempoSlider.addEventListener("change", (event) => {
    // Adding a change event listener for the range.
    drumKit.updateTempo(event);
})