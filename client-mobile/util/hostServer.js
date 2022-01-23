import Constants from "expo-constants";
const ltServer = require('./server.json')
const { manifest } = Constants;

let HOST_SERVER  = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
? 'http://' + manifest.debuggerHost.split(`:`).shift().concat(`:5000`)
: `api.example.com`;

if((HOST_SERVER.indexOf('packager') !== -1 ) || (HOST_SERVER==='http://127.0.0.1:5000'))
    HOST_SERVER = ltServer.HOST_NAME

// HOST_SERVER = 'https://slippery-warthog-82.loca.lt'

module.exports = {
  HOST_SERVER
}