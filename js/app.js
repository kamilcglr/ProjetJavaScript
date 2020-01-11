"use strict";

/**
 * Main script of the index page.
 * Create the playlist and handle user interactions with the page.
 */

let playlist = new Playlist();
let playlistElement = document.getElementById("playlist");
let playing = false;

/**
 * Handle when user click on #myfile button.
 * Create the Song elements, load the songs and render them in HTML.
 * Finally add them to playlist
 * @param playlist in which the Songs are added.
 */
function readSongsFromDisk(playlist) {
    document.querySelector("#myFile").onchange = function (event) {
        /** FileList */ let files = event.target.files;
        for (let i = 0, file; file = files[i]; ++i) {
            console.log(file.webkitRelativePath);
            let path = "resources/" + file.webkitRelativePath;
            let song = new Song(path);
            playlist.add(song);
        }
        playlist.renderInElement(playlistElement);
    };
}

/**
 * Handle when user click on #myVideo button.
 * Create the Video elements, load the videos and render them in HTML.
 * Finally add them to playlist
 * @param playlist in which the Videos are added.
 */
function readVideosFromDisk(playlist) {
    document.querySelector("#myVideo").onchange = function (event) {
        /** FileList */ let files = event.target.files;
        for (let i = 0, file; file = files[i]; ++i) {
            console.log(file.webkitRelativePath);
            let path = "resources/" + file.webkitRelativePath;
            let movie = new Movie(path);
            playlist.add(movie);
        }
        playlist.renderInElement(playlistElement);
    };
}

document.getElementById("viewer").hidden = true;

readSongsFromDisk(playlist);
readVideosFromDisk(playlist);

playlist.renderInElement(playlistElement);


/**
 * Create the buttons from HTML.
 * Handle the clicks.
 * */
let playButton = document.getElementById("play");
let playIcon = document.getElementById("play-icon");

playIcon.classList.toggle("fa-play"); /*Fix for pause that cannot be toggled*/

/**
 * When the user clicks on play,
 *  If a media is currently playing, we pause and change the icon to play.
 *  Else we play and change the icon to pause.
 * */
playButton.onclick = function () {
    playIcon.classList.toggle("fa-play");
    if (playing) {
        /** A Media is currently playing. */
        playing = false;
        playlist.pause();
    } else {
        playing = true;
        playlist.play();
    }
    playlist.renderInElement(playlistElement);
};

/**
 * When the user clicks on nextButton, go to the next media in playlist and render again.
 * */
let nextButton = document.getElementById("next");
nextButton.onclick = function () {
    playlist.next();
    playlist.renderInElement(playlistElement);
};

/**
 * When the user clicks on stopButton, stop currently playing media and render again.
 * */
let stopButton = document.getElementById("stop");
stopButton.onclick = function () {
    if (playing) {
        playing = false;
        playIcon.classList.toggle("fa-play");
    }
    playlist.stop();
    playlist.renderInElement(playlistElement);
};