const fileInput = document.getElementById('fileInput');
const videoPlayer = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const seekBar = document.getElementById('seekBar');
const currentTimeSpan = document.getElementById('currentTime');
const durationTimeSpan = document.getElementById('durationTime');
const muteBtn = document.getElementById('muteBtn');
const volumeBar = document.getElementById('volumeBar');

// Load the selected video file
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        videoPlayer.src = fileURL;
        videoPlayer.load();
        playPauseBtn.textContent = 'Play';
    }
});

// Play or Pause the video
playPauseBtn.addEventListener('click', () => {
    if (videoPlayer.paused || videoPlayer.ended) {
        videoPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        videoPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Stop the video
stopBtn.addEventListener('click', () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    playPauseBtn.textContent = 'Play';
});

// Update the seek bar as the video plays
videoPlayer.addEventListener('timeupdate', () => {
    const value = (100 / videoPlayer.duration) * videoPlayer.currentTime;
    seekBar.value = value;
    currentTimeSpan.textContent = formatTime(videoPlayer.currentTime);
});

// Seek to a different point in the video
seekBar.addEventListener('input', () => {
    const time = (videoPlayer.duration / 100) * seekBar.value;
    videoPlayer.currentTime = time;
});

// Mute or Unmute the video
muteBtn.addEventListener('click', () => {
    videoPlayer.muted = !videoPlayer.muted;
    muteBtn.textContent = videoPlayer.muted ? 'Unmute' : 'Mute';
});

// Adjust the volume
volumeBar.addEventListener('input', () => {
    videoPlayer.volume = volumeBar.value / 100;
});

// Display the video's duration when it's ready
videoPlayer.addEventListener('loadedmetadata', () => {
    durationTimeSpan.textContent = formatTime(videoPlayer.duration);
});

// Format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
