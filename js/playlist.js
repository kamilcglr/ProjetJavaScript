/**
 * Main Class of song and movie
 * @constructor
 */
function Playlist() {
    this.medias = [];
    this.nowPlayingIndex = 0;
}

//---PLAYLIST PROTOTYPES
Playlist.prototype.add = function (song) {
    this.medias.push(song);
};

Playlist.prototype.play = function () {
    let currentMedia = this.medias[this.nowPlayingIndex];
    currentMedia.isPlaying = true;
    currentMedia.play();
};

Playlist.prototype.pause = function () {
    let currentMedia = this.medias[this.nowPlayingIndex];
    currentMedia.isPlaying = false;
    currentMedia.pause();
};

Playlist.prototype.stop = function () {
    let currentMedia = this.medias[this.nowPlayingIndex];
    currentMedia.isPlaying = false;
    currentMedia.stop();
};

Playlist.prototype.next = function () {
    this.stop();
    this.nowPlayingIndex++;
    if (this.nowPlayingIndex === this.medias.length) {
        this.nowPlayingIndex = 0;
    }
    this.play();
};

Playlist.prototype.setCurrentMedia = function (i) {
    this.nowPlayingIndex = i;
};

Playlist.prototype.renderInElement = function (list) {
    list.innerHTML = "";
    for (let i = 0; i < this.medias.length; i++) {
        list.innerHTML += this.medias[i].toHTML();
    }
};