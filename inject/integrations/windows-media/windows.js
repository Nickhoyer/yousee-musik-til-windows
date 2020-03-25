// do imports
const { MediaPlaybackStatus } = require("@nodert-win10-au/windows.media");
const {
  BackgroundMediaPlayer
} = require("@nodert-win10-au/windows.media.playback");
const {
  RandomAccessStreamReference
} = require("@nodert-win10-au/windows.storage.streams");
const { Uri } = require("@nodert-win10-au/windows.foundation");

// setup controls
const Controls = BackgroundMediaPlayer.current.systemMediaTransportControls;
require("./setup-controls")(Controls);

// declare playback functions (what to do when playback state changes)
const startPlayback = track => {
  const { prev, pause, next } = window.buttons;
  window.browser.setThumbarButtons([prev, pause, next]);
  window.browser.setTitle(`${track.artistName} - ${track.trackName}`);

  Controls.playbackStatus = MediaPlaybackStatus.playing;
  Controls.displayUpdater.musicProperties.title = track.trackName;
  Controls.displayUpdater.musicProperties.artist = track.artistName;
  Controls.displayUpdater.musicProperties.albumTitle = track.albumName;
  Controls.displayUpdater.thumbnail = RandomAccessStreamReference.createFromUri(
    new Uri(track.coverUrl)
  );
  Controls.displayUpdater.update();
};

const stopPlayback = track => {
  const { prev, play, next } = window.buttons;
  Controls.playbackStatus = MediaPlaybackStatus.paused;
  window.browser.setTitle("YouSee Musik");
  window.browser.setThumbarButtons([prev, play, next]);
};

// export "hook" function
module.exports = {
  hook: function() {
    const { prev, play, pause, next } = window.buttons;
    // tell thumbnail buttons what to do
    next.click = () => window.player.forward();
    prev.click = () => window.player.backwards();
    pause.click = play.click = () => window.player.pauseOrResume();
    window.browser.setThumbarButtons([prev, play, next]);

    // hook duration and isPlaying state changes
    window.hookedPlayer.subscribe(
      (target, prop, value) => {
        const { source, duration } = target;
        if (prop === "duration" && value) {
          startPlayback(source);
        }
        if (prop === "isPlaying") {
          if (value && duration) {
            startPlayback(source);
          } else if (!value) {
            stopPlayback(source);
          }
        }
      },
      ["duration", "isPlaying"]
    );
  }
};
