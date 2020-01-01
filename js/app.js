"use strict";
let playlist = new Playlist();
let playlistElement = document.getElementById("playlist");
let playing = false;

function readSongsFromDisk(playlist) {
    document.querySelector("#myFile").onchange = function (e) {
        for (let i = 0, f; f = e.target.files[i]; ++i) {
            console.log(f.webkitRelativePath);
            let path = "ressources/" + f.webkitRelativePath;
            let song = new Song(path);
            playlist.add(song);
        }
        playlist.renderInElement(playlistElement);
    };
}

/*
* Main
*/
readSongsFromDisk(playlist);
//--BUTTON FUNCTIONALITY
let playButton = document.getElementById("play");
let playIcon = document.getElementById("play-icon");
playButton.onclick = function () {
    if (playing){
        playlist.pause();
        playIcon.classList.toggle("fa-play")
    }
    else{
        playlist.play();
        playIcon.classList.toggle("fa-pause")
    }
    playlist.renderInElement(playlistElement);
};

let nextButton = document.getElementById("next");
nextButton.onclick = function () {
    playlist.next();
    playlist.renderInElement(playlistElement);
};

let stopButton = document.getElementById("stop");
stopButton.onclick = function () {
    playlist.stop();
    playlist.renderInElement(playlistElement);
};
