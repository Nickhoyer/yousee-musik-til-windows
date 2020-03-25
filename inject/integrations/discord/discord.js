// do imports
const DiscordRPC = require("discord-rpc");

// register that we're using the yousee musik app
const clientId = "691992120117952542";
DiscordRPC.register(clientId);

// create client
const rpc = new DiscordRPC.Client({ transport: "ipc" });

// login
rpc.login({ clientId }).catch(err => {
  console.error(err);
});

// declare playback functions (what to do when playback state changes)
const startPlayback = (track, timeLeft) => {
  if (!track || !timeLeft) return;
  const endDate = new Date(new Date().getTime() + timeLeft * 1000);
  const startDate = new Date(endDate.getTime() - track.lengthInSeconds * 1000);
  const activityObject = {
    details: track.trackName,
    state:
      track.artistName +
      (track.trackName !== track.albumName ? ", " + track.albumName : ""),
    startTimestamp: startDate.getTime(),
    endTimestamp: endDate.getTime(),
    largeImageKey: "logo",
    largeImageText: "musik.yousee.dk",
    instance: false
  };
  rpc.setActivity(activityObject);
};
const stopPlayback = () => rpc.clearActivity();

// export "hook" function
module.exports = {
  hook: function() {
    // hook duration and isPlaying state changes
    window.hookedPlayer.subscribe(
      (target, prop, value) => {
        const { source, duration, played } = target;
        if (prop === "duration" && value) {
          const timeLeft = value - played;
          startPlayback(source, timeLeft);
        }
        if (prop === "isPlaying") {
          if (value && duration) {
            const timeLeft = duration - played;
            startPlayback(source, timeLeft);
          } else if (!value) {
            stopPlayback();
          }
        }
      },
      ["duration", "isPlaying"]
    );
  }
};
