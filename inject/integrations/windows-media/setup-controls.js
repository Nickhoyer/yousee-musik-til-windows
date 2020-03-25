// do imports
const media = require("@nodert-win10-au/windows.media");
const {
  MediaPlaybackStatus,
  MediaPlaybackType,
  SystemMediaTransportControlsButton
} = media;

// export function for modifying the SystemMediaTransportControls object
module.exports = Controls => {
  Controls.isChannelDownEnabled = false;
  Controls.isChannelUpEnabled = false;
  Controls.isFastForwardEnabled = false;
  Controls.isNextEnabled = true;
  Controls.isPauseEnabled = true;
  Controls.isPlayEnabled = true;
  Controls.isPreviousEnabled = true;
  Controls.isRecordEnabled = false;
  Controls.isRewindEnabled = false;
  Controls.isStopEnabled = true;
  Controls.playbackStatus = MediaPlaybackStatus.closed;
  Controls.displayUpdater.type = MediaPlaybackType.music;
  Controls.displayUpdater.musicProperties.title = "YouSee Musik Player";
  Controls.displayUpdater.musicProperties.artist = "";
  Controls.displayUpdater.update();

  Controls.on("buttonpressed", (sender, eventArgs) => {
    switch (eventArgs.button) {
      case SystemMediaTransportControlsButton.play:
        window.player.pauseOrResume();
        break;
      case SystemMediaTransportControlsButton.pause:
        window.player.pauseOrResume();
        break;
      case SystemMediaTransportControlsButton.stop:
        window.player.pauseOrResume();
        break;
      case SystemMediaTransportControlsButton.next:
        window.player.forward();
        break;
      case SystemMediaTransportControlsButton.previous:
        window.player.backwards();
        break;
      default:
        break;
    }
  });
};
