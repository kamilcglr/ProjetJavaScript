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

function playable(testObj) {
    if (typeof testObj.play == "function") {
        return true;
    }
    return false;
}
/*
Media.prototype.play = function () {
    if (playable(this)) {
        this.play();
    }
};

Media.prototype.stop = function () {
    if (playable(this)) {
        this.stop();
        this.isPlaying = false;
    }
};*/
