"use strict";

/**
 * Movie class.
 * @constructor
 */
function Movie(path) {
    Media.call(this, path);

    /** String */ this.date = this.stringArray[1];

    /** HTMLVideoElement */ this.video = document.createElement("video");
    this.video.setAttribute("src", path);

    /**When the video is loaded, format the duration.*/
    this.video.addEventListener('loadeddata', () => {
        this.duration = this.formatDuration(this.video.duration);
    });
}

/*
* Movie inherit from Media.
*/
Movie.prototype = Object.create(Media.prototype);

/**
 * Play and show the video.
 * */
Movie.prototype.play = function () {
    //Play the video element.
    this.video.play();
    document.getElementById("viewer").hidden = false;
    document.getElementById("viewer").appendChild(this.video);

};

/**
 * Stop and hide the video.
 * */
Movie.prototype.stop = function () {
    this.video.pause();
    this.video.currentTime = 0;
    document.getElementById("viewer").hidden = true;
    document.getElementById("viewer").innerHTML = "";
};

/**
 * Pause the video without hiding.
 * */
Movie.prototype.pause = function () {
    this.video.pause();
};

/**
 * Generate HTML to render the video element.
 * @return string
 * */
Movie.prototype.toHTML = function () {
    let htmlString = '<li';

    //Checks if video is currently playing.
    if (this.isPlaying) {
        htmlString += ' class="current"';
    }

    htmlString += '>';
    htmlString += this.title;
    htmlString += ' - ';
    htmlString += this.date;

    //Checks if video is liked. Decide which icon to choose.
    let classIcon;
    if (this.liked === true) {
        classIcon = "likeIcon fas fa-heart";
    } else {
        classIcon = "likeIcon far fa-heart"
    }

    htmlString += `<button id="${this.title}" class="likeButton"><i  class="${classIcon}"></i></button>`;
    htmlString += '<span class="duration">';
    htmlString += this.duration;
    htmlString += '</span></li>';

    return htmlString;
};