const path = require("path");
const { app } = require("electron").remote;
const assetsPath = app.isPackaged
  ? path.join(process.resourcesPath, "assets")
  : path.join(__dirname, "..", "assets");

const play = {
  tooltip: "Afspil",
  icon: path.join(assetsPath, "play.png"),
  click() {
    console.log("play clicked.");
  }
};
const pause = {
  tooltip: "Pause",
  icon: path.join(assetsPath, "pause.png"),
  click() {
    console.log("pause clicked.");
  }
};
const next = {
  tooltip: "Næste",
  icon: path.join(assetsPath, "next.png"),
  click() {
    console.log("next clicked");
  }
};
const prev = {
  tooltip: "Tilbage",
  icon: path.join(assetsPath, "prev.png"),
  click() {
    console.log("prev clicked");
  }
};

module.exports = {
  play,
  pause,
  next,
  prev
};
