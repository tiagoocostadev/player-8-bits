const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");
const shuffleButton = document.getElementById("shuffle-song");
const repeatButton = document.getElementById("repeat-song");

const songs = [
    {
        image: "./images-album/album1.jpg",
        name: "Daylight Cinematic",
        artist: "David Kushner",
        audio: "./tracks/daylight.mp3"
    },
    {
        image: "./images-album/album2.jpg",
        name: "Humankind",
        artist: "David Kushner",
        audio: "./tracks/humankind.mp3"
    },
    {
        image: "./images-album/album3.jpg",
        name: "War",
        artist: "Edwin Starr",
        audio: "./tracks/war-edwin-starr.mp3",
    },
    {
        image: "./images-album/album4.jpg",
        name: "Bang Bang",
        artist: "Knaan",
        audio: "./tracks/bang-bang.mp3",
    },
];

const audio = document.createElement("audio");
let currentSongIndex = 0;
updateSong();

// shuffleButto.addEventListener
// repeatButton.addEventListener (não esquecer esses dois)

prevSongButton.addEventListener("click", () => {
    currentSongIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
    updateSong();
});

nextSongButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSong();
});

playpauseButton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        playpauseButton.classList.remove("fa-circle-play");
        playpauseButton.classList.add("fa-circle-pause");
    } else {
        audio.pause();
        playpauseButton.classList.remove("fa-circle-pause");
        playpauseButton.classList.add("fa-circle-play");
    }
});

function updateSong() {
    const song = songs[currentSongIndex];

    songImage.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    const wasPlaying = !audio.paused;

    audio.src = song.audio;
    audio.onloadedmetadata = function() {
        songSlider.value = 0;
        songSlider.max = audio.duration;
        updateSliderFill();
    }
    if (wasPlaying) {
        audio.play();
    }
};

songSlider.addEventListener("change", function() {
    audio.currentTime = songSlider.value;
});

function moveSlider() {
    songSlider.value = audio.currentTime;
};

setInterval(moveSlider, 1000);

function updateSliderFill() {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;

    songSlider.style.background = `linear-gradient(
        to right,
        #ffffff 0%,
        #ffffff ${percent}%,
        #555555 ${percent}%,
        #555555 100%
    )`;
}

audio.addEventListener("timeupdate", () => {
    songSlider.value = audio.currentTime;
    updateSliderFill();
});