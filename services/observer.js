const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const fsExtra = require('fs-extra');

class Observer extends EventEmitter {
  constructor() {
    super();
  }
  watchFolder(folder) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for folder changes on: ${folder}`
      );
      var watcher = chokidar.watch(folder, { persistent: true });
      watcher.on('add', filePath => {
          console.log(
            `[${new Date().toLocaleString()}] ${filePath} has been added.`
          );
          const imgData = fs.readFileSync(filePath);
          const imgBuffer = Buffer.from(imgData)

          // emit an event when new file has been added
          this.emit('file-added', {
            filePath,
            data: imgBuffer
          });
          // await fsExtra.unlink(filePath);
          console.log(
            `[${new Date().toLocaleString()}] ${filePath} has been removed.`
          );
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Observer;