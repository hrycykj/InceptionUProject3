import Constants from "expo-constants";
const { manifest } = Constants;

const HOST_SERVER  = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
? 'http://' + manifest.debuggerHost.split(`:`).shift().concat(`:5000`)
: `api.example.com`;

module.exports = {
  HOST_SERVER
}