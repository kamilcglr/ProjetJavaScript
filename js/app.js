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

function readVideosFromDisk(playlist) {
    document.querySelector("#myVideo").onchange = function (e) {
        for (let i = 0, f; f = e.target.files[i]; ++i) {
            console.log(f.webkitRelativePath);
            let path = "ressources/" + f.webkitRelativePath;
            let movie = new Movie(path);
            playlist.add(movie);
        }
        playlist.renderInElement(playlistElement);
    };
}

/*
* Main
*/
document.getElementById("viewer").hidden = true;

readSongsFromDisk(playlist);
readVideosFromDisk(playlist);

//--BUTTON FUNCTIONALITY
let playButton = document.getElementById("play");
let playIcon = document.getElementById("play-icon");
/*Fix for pause that cannot be toggled*/
playIcon.classList.toggle("fa-play");
playButton.onclick = function () {
    playIcon.classList.toggle("fa-play");
    if (playing) {
        playing = false;
        playlist.pause();

    } else {
        playing = true;
        playlist.play();
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
    if (playing) {
        playing = false;
        playIcon.classList.toggle("fa-play");
    }

    playlist.stop();
    playlist.renderInElement(playlistElement);
};

let likeButton = document.getElementById("like");
let likeIcon = document.getElementById("like-icon");
likeButton.onclick = function () {
    likeIcon.classList.toggle("fas");
};
