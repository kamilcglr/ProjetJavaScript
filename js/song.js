"use strict";

/**
 * Song Class
 * @constructor
 */
function Song(path) {
    Media.call(this, path);

    this.artist = this.stringArray[1];

    this.audio = new Audio(path);
    this.audio.addEventListener('loadeddata', () => {
        this.duration = this.audio.duration;

        let hours = Math.floor(this.duration / 3600);
        let minutes = Math.floor((this.duration - (hours * 3600)) / 60);
        let seconds = this.duration - (hours * 3600) - (minutes * 60);

        this.duration = hours.toString().padStart(2, '0') + ':' +
            minutes.toString().padStart(2, '0') + ':' +
            seconds.toString().slice(0, 2).padStart(2, '0');

    });
}

Song.prototype = Object.create(Media.prototype);

Song.prototype.play = function () {
    document.getElementById("viewer").appendChild(this.audio);
    this.isPlaying = true;
    this.audio.play();
};

Song.prototype.stop = function () {
    document.getElementById("viewer").innerHTML = "";
    this.pause();
    this.audio.currentTime = 0;
};

Song.prototype.pause = function () {
    this.isPlaying = false;
    this.audio.pause();
};

//Generates HTML code for index.html
Song.prototype.toHTML = function () {
    let htmlString = '<li';

    //Checks if song is currently playing
    if (this.isPlaying) {
        htmlString += ' class="current"';
    }

    htmlString += '>';
    htmlString += this.title;
    htmlString += ' - ';
    htmlString += this.artist;
    htmlString += '<span class="duration">';
    htmlString += this.duration;
    htmlString += '</span></li>';

    return htmlString;
};