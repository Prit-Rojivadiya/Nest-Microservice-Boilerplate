const FCM = require('fcm-node');
require('dotenv').config();

const client = new FCM(process.env.FCM_SERVER_KEY);

export const sendNotification = async (registrationToken, message) => {
  return new Promise((resolve, reject) => {
    client.send(
      {
        to: registrationToken,
        notification: {
          title: message.title,
          body: message.body,
        },
      },
      (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      },
    );
  });
};
