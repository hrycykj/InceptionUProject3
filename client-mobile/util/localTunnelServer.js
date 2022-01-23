const localtunnel = require('localtunnel');
const fs = require('fs');
const fileName = './server.json';
const file = require(fileName);
    
    
(async () => {
    const tunnel = await localtunnel({ port: 5000 });
    file.HOST_NAME = tunnel.url;
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
      });  
    tunnel.on('close', () => {
      // tunnels are closed
    });
  })();
