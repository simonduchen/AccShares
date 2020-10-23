# AccShares
This is a course project at Chalmers Univerity of Technology in the course Mobile Computing. 

Developed by Simon Duchén and Linnéa Bark.

To find out more about this project go to https://barklinnea0.wixsite.com/mobilecomputing
## Mobile Computing Project: AccShares
This project is a native prototype of a mobile user interface for a smart lock application that uses the fingerprint scanner to verify physical accesses that are shared.

Since this is a prototype there is no backend actually storing data or connecting the application to any smart lock devices, it is only to show a native UI that contains the functionality and design that project aimed for.

There are two test users that can be found in userdata.json, they are used to login to the application 

Test user 1: 

    username: simonduchen
    password: password
Test user 2: 

    username: linneabark
    password: password

If your device is compatible with a fingerprint scanner you can also login directly using that.

## Instructions to run:

This project is created with Expo and React Native which both are NodeJs framworks.

Instructions to download NodeJS here: https://nodejs.org/en/download/

First install dependencies:

`npm install`

Run the application through a local expo server: 

`npm start` or `expo start`

A new tab will open in your browser which contains the metro bundler which allows you to run the application on your device or in the browser.

You can download the Expo app on your device and use the QR-code to automatically connect to the Expo server and run the application.

Download links:

Google play: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=sv

Appstore: https://apps.apple.com/se/app/expo-client/id982107779

or

You can run the application on a emulator, you can find the instructions here: 

Android:
https://docs.expo.io/workflow/android-studio-emulator/ 

IOS:
https://docs.expo.io/workflow/ios-simulator/
