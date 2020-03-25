// import title bar
const Titlebar = require("custom-electron-titlebar");

// export load function
module.exports = {
  load: () => {
    (async () => {
      // override css to create transparent title bar with only window controls
      await window.browser.webContents.insertCSS(
        `.titlebar.windows{
          background:none!important;
        }
        .titlebar.windows>.window-title{
          display:none;
        }
        .titlebar.windows>.window-controls-container{
          position:fixed;
          right:0;
        }
        .titlebar.windows>.menubar{
          display:none;
        }`
      );
      // initialize title bar
      new Titlebar.Titlebar();
    })();
  }
};
