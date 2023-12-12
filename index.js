import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;
console.log('buffer added - babel added');
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getMessaging, getToken, onMessage } = require("firebase/messaging");
// Import the MQTT library
const mqtt = require('mqtt');
// Create a client instance
let client = null;

function initFirebase() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDzxtNGFeXozmc_kYzHZhg2r9Ereo2wukg",
    authDomain: "omid-f8d2b.firebaseapp.com",
    projectId: "omid-f8d2b",
    storageBucket: "omid-f8d2b.appspot.com",
    messagingSenderId: "422067721913",
    appId: "1:422067721913:web:25ff75784eeb4e13012d68",
    measurementId: "G-QD1S8P5TMW"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Request permission to receive notifications
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Get registration token
      const messaging = getMessaging();
      getToken(messaging, { vapidKey: 'BB0rUaCvQVl1NA9sENmz9yOEkO4pZAznc44Uvzul8Z3lo8PAftUvfjwhaDwpJd5waExuO8jVctt_KZnJsCf_mqY' }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server
          console.log('Token: ', currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });

      // Handle incoming messages
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        handleMqtt(payload);
      });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}
function handleMqtt(payload) {
  // Check if not connected to MQTT then connect
  if (!client || client.connected === false) {
    client = mqtt.connect('mqtts://hcb8e882.ala.asia-southeast1.emqxsl.com:8883');
  }

  client.on('connect', function () {
    // Subscribe to a topic with name 'Omid-app'
    client.subscribe('Omid-app', function (err) {
      if (!err) {
        // Publish the payload from onMessage
        client.publish('Omid-app', JSON.stringify(payload), function(err) {
          if (!err) {
            console.warn('published message: ', payload);
          }
        });
      }
    });
  });

  // Close MQTT connection
  client.end();
}
module.exports = {
  initFirebase
};
