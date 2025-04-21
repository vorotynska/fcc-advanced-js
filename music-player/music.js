// Create a music player app capable of playing, pausing, and skipping songs from a playlist.

const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const playingSong = document.getElementById("player-song-title");
const songArtist = document.getElementById("player-song-artist");

const allSongs = [{
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
    },
    {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    },
    {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    },
    {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    },
    {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    },
    {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    },
];

const audio = new Audio();
const userData = {
    songs: allSongs,
    currentSong: null,
    songCurrentTime: 0,
};

// The functionality for playing the displayed songs
function playSong(id, start = true) {
    const song = userData.songs.find((song) => song.id === id);
    audio.src = song.src;
    audio.title = song.title;

    if (userData.currentSong == null || start) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData.songCurrentTime;
    }
    userData.currentSong = song;
    playButton.classList.add("playing");
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
    audio.play()
}

//pausing the currently playing song
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove("playing")
    audio.pause()
}

// get the index of each song in the songs property of userData
const getCurrentSongIndex = () => userData.songs.indexOf(userData.currentSong);

//find next song to play
const getNextSong = () => userData.songs[getCurrentSongIndex() + 1];

// find previous song to play
const getPreviousSong = () => userData.songs[getCurrentSongIndex() - 1];

const playNextSong = () => {
    if (userData.currentSong === null) {
        playSong(userData.songs[0].id);
        return;
    }
    const nextSong = getNextSong();
    if (nextSong) {
        playSong(nextSong.id);
    } else {
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        setPlayerDisplay();
        highlightCurrentSong();
        setPlayButtonAccessibleText();
        pauseSong();
    }
}

const playPreviousSong = () => {
    if (userData.currentSong === null) {
        return
    }
    const previousSong = getPreviousSong();
    if (previousSong) {
        playSong(previousSong.id);
    } else {
        playSong(userData.songs[0].id);
    }
}

// display song title and artist
const setPlayerDisplay = () => {
    const currentTitle = userData.currentSong?.title;
    const currentArtist = userData.currentSong?.artist;

    playingSong.textContent = currentTitle ? currentTitle : "";
    songArtist.textContent = currentArtist ? currentArtist : "";
}


// creating a function to highlight any song that is being played
const highlightCurrentSong = () => {
    const previousCurrentSong = document.querySelector('.playlist-song[aria-current="true"]');
    previousCurrentSong?.removeAttribute("aria-current");
    const songToHighlight = document.getElementById(
        `song-${userData.currentSong?.id}`
    );

    songToHighlight?.setAttribute("aria-current", "true");
}

// it is important that the play button describes the current song or the first song in the playlist
const setPlayButtonAccessibleText = () => {
    const song = userData.currentSong;
    playButton.setAttribute("aria-label", userData.currentSong ? `Play ${song.title}` : "Play");
};

//add the functionality to the play button
playButton.addEventListener("click", () => {
    if (userData.currentSong === null) {
        playSong(userData.songs[0].id);
    } else {
        playSong(userData.currentSong.id, false);
    }
});

const songs = document.querySelectorAll(".playlist-song");

songs.forEach((song) => {
    const id = song.getAttribute("id").slice(5);
    const songBtn = song.querySelector("button");
    songBtn.addEventListener("click", () => {
        playSong(Number(id));
    })
});

pauseButton.addEventListener("click", pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

audio.addEventListener("ended", playNextSong);