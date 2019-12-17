"use strict";
let playlist = new Playlist();

function readSongsFromDisk(playlist) {
    document.querySelector("#myFile").onchange = function (e) {
        for (let i = 0, f; f = e.target.files[i]; ++i) {
            console.log(f.webkitRelativePath);
            let path = "ressources/" + f.webkitRelativePath;
            let song = new Song(path);
            playlist.add(song);
        }
    };
}

/*
* Main
*/
readSongsFromDisk();

