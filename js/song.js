"use strict";

/**
 * Song Class
 * @constructor
 */
function Song(path) {
    Media.call(this, path);
    this.artist = "artist";
    this.audio = new Audio(path);
    this.audio.addEventListener('loadeddata', () => {
        this.duration = this.audio.duration;
        this.loaded = true;
    });
}

Song.prototype = Object.create(Media.prototype);
