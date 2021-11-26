//app module controls your app's event lifecycle
//BrowserWindow for the window application
const { app, BrowserWindow } = require("electron");
require("dotenv").config();

//function to call to create BroserWindow
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

const { exec } = require("child_process");

exec(
  `discord && npm --prefix ${process.env.PATH_TO_FINGERTIPS} run start`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
