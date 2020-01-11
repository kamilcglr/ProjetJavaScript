/**
 * Playlist class. Contains a list of media (songs or videos).
 * Remember the index of playing media.
 * @constructor
 */
function Playlist() {
    /** listMedias */ this.medias = [];
    /** int */ this.nowPlayingIndex = 0;
}

/**
 * Add a media to playlist medias list.
 * @param song
 */
Playlist.prototype.add = function (song) {
    this.medias.push(song);
};

/**
 * Play the current media by calling the appropriate function of object.
 */
Playlist.prototype.play = function () {
    let currentMedia = this.medias[this.nowPlayingIndex];
    currentMedia.isPlaying = true;
    currentMedia.play();
};

/**
 * Pause the current media by calling the appropriate function of object.
 */
Playlist.prototype.pause = function () {
    let currentMedia = this.medias[this.nowPlayingIndex];
    currentMedia.isPlaying = false;
    currentMedia.pause();
};

/**
 * Stop the current media by calling the appropriate function of object.
 */
Playlist.prototype.stop = function () {
    let currentMedia = this.medias[this.nowPlayingIndex];
    currentMedia.isPlaying = false;
    currentMedia.stop();
};

/**
 * Stop current media and increment the index of playing, then play the media.
 */
Playlist.prototype.next = function () {
    this.stop();
    this.nowPlayingIndex++;
    if (this.nowPlayingIndex === this.medias.length) {
        this.nowPlayingIndex = 0;
    }
    this.play();
};

/**
 * Set the index of currently playing.
 * @param i int index of media in mediasList.
 */
Playlist.prototype.setCurrentMedia = function (i) {
    this.nowPlayingIndex = i;
};

/**
 * Render the playlist by calling the appropriate function of media.
 * @param list htmlList.
 */
Playlist.prototype.renderInElement = function (list) {
    list.innerHTML = "";
    for (let i = 0; i < this.medias.length; i++) {
        list.innerHTML += this.medias[i].toHTML();
    }

    // Change the heart icon if it is liked or disliked.
    document.querySelectorAll('.likeButton').forEach(item => {
        item.addEventListener('click', event => {
            let media = playlist.medias.filter(value => value.title === item.id)[0];

            if (item.firstElementChild.classList.contains("fas")) {
                item.firstElementChild.classList.replace("fas", "far");
                media.liked = true;
            } else {
                item.firstElementChild.classList.replace("far", "fas");
                media.liked = true;
            }
        })
    });
};