# InceptionUProject3
Project 3 Repo

Quick Start Guide

- npm install in root directory
- add .env file to client-mobile directory with EXPO_CLIENT_ID from google credentials
- go to google credentials for InceptionUProject3 & make sure you've added https://auth.expo.io/@your-expo-username/client-mobile to Authorized Redirect URIs under OAuth 2.0 Client Ids Expo-Project3, replace 'your-expo-username' with your details from ExpoGo (this only effects the Google Login button on the profile page).  You will also need to be signed in to your ExpoGo account on your phone for this to work.

- To run, execute the following commands in individual terminal windows:
1) npm start (starts the server on localhost 5000)
2) npm run start-lt (starts a local tunnel, possibly only needed for some emulators or iPhone)
3) npm run start-mobile (starts a Metro server for ExpoGo)
4) Once all three npm commands have been executed, press 'a' for android emulator or 'i' for iphone emulator (only works on an Apple computer), or scan the QR code shown in the terminal window (with the ExpoGo app on Android phones, with the camera app on iOS) to open the app in ExpoGo