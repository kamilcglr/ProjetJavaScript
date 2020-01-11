"use strict";

/**
 * Song Class.
 * @constructor
 */
function Song(path) {
    Media.call(this, path);

    /** String */ this.artist = this.stringArray[1];

    /** HTMLAudioElement */  this.audio = new Audio(path);

    /**When the song is loaded, format the duration.*/
    this.audio.addEventListener('loadeddata', () => {
        this.duration = this.formatDuration(this.audio.duration)
    });
}

/*
* Song inherit from Media.
*/
Song.prototype = Object.create(Media.prototype);

/**
 * Play the song.
 * */
Song.prototype.play = function () {
    this.audio.play();
};

/**
 * Stop the song and go to beginning of the song.
 * */
Song.prototype.stop = function () {
    this.audio.pause();
    this.audio.currentTime = 0;
};

/**
 * Pause the song.
 * */
Song.prototype.pause = function () {
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

    //Checks if song is liked. Decide which icon to choose.
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