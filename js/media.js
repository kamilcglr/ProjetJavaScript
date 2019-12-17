"use strict";

/**
 * Main Class of song and movie
 * @constructor
 */
function Media(path) {
    /** string */ this.path = path;
    /** string */ this.title = "";
    /** boolean */ this.isPlaying = false;
    /** double */ //this.duration = undefined;
}

Media.prototype.play = function() {
    this.isPlaying = true;
};

Media.prototype.stop = function() {
    this.isPlaying = false;
};