// Sets up and calls all files that are injected
(function() {
  const console = { ...window.console };
  const hookPlayer = require("./player-hook");
  const browser = require("electron").remote.BrowserWindow.getAllWindows()[0];
  const discord = require("./integrations/discord");
  const windows = require("./integrations/windows-media");
  const buttons = require("../app/buttons");
  const { prev, play, next } = buttons;

  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      window.console = console;
      window.browser = browser;
      browser.setThumbarButtons([prev, play, next]);
      window.buttons = buttons;
      require("./title-bar").load();

      hookPlayer();
      discord.hook();
      windows.hook();
    }
  });
})();
