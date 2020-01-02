"use strict";

/**
 * Main Class of song and movie
 * @constructor
 */
function Media(path) {
    /** string */ this.path = path;
    /** string */ this.title = "";
    /** boolean */this.isPlaying = false;
    /** double */ this.duration = undefined;

    this.stringArray = path.substr(path.lastIndexOf('/') + 1);
    this.stringArray = this.stringArray.replace(/\.[^/.]+$/, "");
    this.stringArray = this.stringArray.split('_');

    this.title = this.stringArray[0];
}
/* Dont work -> use global video element

Media.prototype.play = function () {
    this.isPlaying = true;
    this.play();
};

Media.prototype.pause = function () {
    this.isPlaying = false;
    this.pause();
};

Media.prototype.stop = function () {
    this.isPlaying = false;
    this.stop();
};
*/
