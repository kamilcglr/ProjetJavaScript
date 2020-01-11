"use strict";

/**
 * Main Class of song and movie.
 * @constructor
 */
function Media(path) {
    /** string */ this.path = path;
    /** string */ this.title = "";
    /** boolean */this.isPlaying = false;
    /** double */ this.duration = undefined;
    /** boolean */ this.liked = false;

    /*
    * Will contains all the information extracted from the name of the file
    * For a song it is, Title_Artist.mp3.
    * For a video it is, Title_Year.mp4
    */
    this.stringArray = path.substr(path.lastIndexOf('/') + 1);
    this.stringArray = this.stringArray.replace(/\.[^/.]+$/, "");
    this.stringArray = this.stringArray.split('_');

    this.title = this.stringArray[0];
}

/**
 * Parse a duration to hh:mm:ss format.
 * @param duration
 * @return string formatted duration
 */
Media.prototype.formatDuration = function (duration) {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - (hours * 3600)) / 60);
    let seconds = duration - (hours * 3600) - (minutes * 60);

    return hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().slice(0, 2).padStart(2, '0');
};