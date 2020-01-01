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

function playable(testObj) {
    if (typeof testObj.play == "function") {
        return true;
    }
    return false;
}


Media.prototype.play = function () {
    if (playable(this)) {
        this.play();
    }
};

Media.prototype.pause = function () {
    if (playable(this)) {
        this.pause();
        this.isPlaying = false;
    }
};

Media.prototype.stop = function () {
    if (playable(this)) {
        this.stop();
        this.isPlaying = false;
    }
};
