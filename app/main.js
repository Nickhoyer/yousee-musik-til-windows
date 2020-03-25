module.exports = () => {
  const electron = require("electron");
  const { app, BrowserWindow } = electron;
  const path = require("path");

  if (!app.isPackaged)
    require("electron-reload")(path.join(__dirname, ".."), {
      electron: require(`${path.join(__dirname, "..")}/node_modules/electron`)
    });

  const assetsPath = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "..", "assets");

  function createWindow() {
    const win = new BrowserWindow({
      title: "YouSee Musik",
      width: 1200,
      height: 800,
      frame: false,
      icon: path.join(assetsPath, "logo.png"),
      webPreferences: {
        preload: path.join(__dirname, "..", "inject", "preload.js"),
        devTools: !app.isPackaged
      }
    });
    if (!app.isPackaged) win.webContents.openDevTools();
    win.on("page-title-updated", e => e.preventDefault());
    win.removeMenu();
    return win.loadURL("https://musik.yousee.dk/?nofirst=");
  }
  app.whenReady().then(createWindow);
};
