"use strict";

/**
 * Song Class
 * @constructor
 */
function Movie(path) {
    Media.call(this, path);

    this.date = this.stringArray[1];

    this.video = document.createElement("video");
    this.video.setAttribute("src", path);
    this.video.addEventListener('loadeddata', () => {
        this.duration = this.video.duration;

        let hours = Math.floor(this.duration / 3600);
        let minutes = Math.floor((this.duration - (hours * 3600)) / 60);
        let seconds = this.duration - (hours * 3600) - (minutes * 60);

        this.duration = hours.toString().padStart(2, '0') + ':' +
            minutes.toString().padStart(2, '0') + ':' +
            seconds.toString().slice(0, 2).padStart(2, '0');

    });
}

Movie.prototype = Object.create(Media.prototype);

Movie.prototype.play = function () {
    this.video.play();
    document.getElementById("viewer").hidden = false;
    document.getElementById("viewer").appendChild(this.video);

};

Movie.prototype.stop = function () {
    this.video.pause();
    this.video.currentTime = 0;
    document.getElementById("viewer").hidden = true;
    document.getElementById("viewer").innerHTML = "";
};

Movie.prototype.pause = function () {
    this.video.pause();
};

//Generates HTML code for index.html
Movie.prototype.toHTML = function () {
    let htmlString = '<li';

    //Checks if song is currently playing
    if (this.isPlaying) {
        htmlString += ' class="current"';
    }

    htmlString += '>';
    htmlString += this.title;
    htmlString += ' - ';
    htmlString += this.date;
    htmlString += '<span class="duration">';
    htmlString += this.duration;
    htmlString += '</span></li>';

    return htmlString;
};