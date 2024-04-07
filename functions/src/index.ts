import { logger, setGlobalOptions } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin/app";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging, Message, Notification } from "firebase-admin/messaging";

export interface Device {
  id: string;
  port1: number;
  port2: number;
  port3: number;
  port4: number;
  port5: number;
  volt1: number;
  limit1: number;
  limit2: number;
  limit3: number;
  limit4: number;
  limit5: number;
  kwh1: number;
  kwh2: number;
  kwh3: number;
  kwh4: number;
  kwh5: number;
  temp: number;
  humidity: number;
}

const currentOffset = 0.6;

initializeApp();
setGlobalOptions({ region: "asia-east1", maxInstances: 10 });

exports.updateKwh = onDocumentUpdated("device/readings", async (event) => {
  if (!event || !event.data) return;

  const oldReadingData = event.data.before.data() as Device;
  const newReadingData = event.data.after.data() as Device;

  if (anyCurrentChanged(oldReadingData, newReadingData)) {
    updateKwh(newReadingData, event.data.after.ref);
  }
});

exports.watchCurrent = onDocumentUpdated("device/readings", async (event) => {
  if (!event || !event.data) return;

  const oldReadingData = event.data.before.data() as Device;
  const newReadingData = event.data.after.data() as Device;

  if (
    oldReadingData.port1 < oldReadingData.limit1 &&
    newReadingData.port1 >= newReadingData.limit1
  ) {
    sendNotif(1, newReadingData.limit1);
  }

  if (
    oldReadingData.port2 < oldReadingData.limit2 &&
    newReadingData.port2 >= newReadingData.limit2
  ) {
    sendNotif(2, newReadingData.limit2);
  }

  if (
    oldReadingData.port3 < oldReadingData.limit3 &&
    newReadingData.port3 >= newReadingData.limit3
  ) {
    sendNotif(3, newReadingData.limit3);
  }

  if (
    oldReadingData.port4 < oldReadingData.limit4 &&
    newReadingData.port4 >= newReadingData.limit4
  ) {
    sendNotif(4, newReadingData.limit4);
  }

  if (
    oldReadingData.port5 < oldReadingData.limit5 &&
    newReadingData.port5 >= newReadingData.limit5
  ) {
    sendNotif(5, newReadingData.limit5);
  }

  // if (anyCurrentChanged(oldReadingData, newReadingData)) {
  //   updateKwh(newReadingData, event.data.after.ref);
  // }

  logger.info(`newReadingData.port1: ${newReadingData.port1}`, {
    structuredData: true,
  });

  return;

  // logger.info(`newMosquitoDetectedState: ${newMosquitoDetectedState}`, {
  //   structuredData: true,
  // });
});

function anyCurrentChanged(oldReadingData: Device, newReadingData: Device) {
  return (
    oldReadingData.port1 !== newReadingData.port1 ||
    oldReadingData.port2 !== newReadingData.port2 ||
    oldReadingData.port3 !== newReadingData.port3 ||
    oldReadingData.port4 !== newReadingData.port4 ||
    oldReadingData.port5 !== newReadingData.port5
  );
}

function updateKwh(
  device: Device,
  ref: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
) {
  logger.info(`will updateKwh: ${device.id}`, {
    structuredData: true,
  });

  const currents = [
    device.port1,
    device.port2,
    device.port3,
    device.port4,
    device.port5,
  ];

  const voltages = [device.volt1];

  const power = currents.map((c, i) => (c * voltages[0]) / 1000);
  const additionalKwh = power.map((p, i) => (p * 5) / 3600);

  ref.update({
    kwh1: device.kwh1 + additionalKwh[0],
    kwh2: device.kwh2 + additionalKwh[1],
    kwh3: device.kwh3 + additionalKwh[2],
    kwh4: device.kwh4 + additionalKwh[3],
    kwh5: device.kwh5 + additionalKwh[4],
  });
}

async function sendNotif(port: number, limit: number) {
  logger.info(`sendNotif: PORT:${port} - LIMIT:${limit}`, {
    structuredData: true,
  });
  // Get the list of device tokens.
  const allTokens = await getFirestore().collection("all_tokens").get();

  logger.info(`allTokens: size=${allTokens.size}`, {
    structuredData: true,
  });

  allTokens.forEach(async (tokenDoc) => {
    const message: Message = {
      notification: {
        title: `Current in Port ${port} has exceeded the limit of ${(
          limit - currentOffset
        ).toFixed(2)}A`,
        //   body: `Current in Port ${port} has exceeded the limit of ${limit}mA!`,
        imageUrl:
          "https://static-00.iconduck.com/assets.00/caution-electricity-icon-2048x1802-d6m6g25z.png",
      } as Notification,
      token: tokenDoc.id,
    };

    logger.info(`message: ${message.notification?.title}`, {
      structuredData: true,
    });
    const m = await getMessaging();
    logger.info(`m: ${m}`, {
      structuredData: true,
    });
    m.send(message);
    logger.info(`sentttttttttNotif: PORT:${port} - ID:${tokenDoc.id}`, {
      structuredData: true,
    });
  });
}

// // Cleans up the tokens that are no longer valid.
// function cleanupTokens(response, tokens) {
//   // For each notification we check if there was an error.
//   const tokensDelete = [];
//   response.results.forEach((result, index) => {
//     const error = result.error;
//     if (error) {
//       functions.logger.error(
//         "Failure sending notification to",
//         tokens[index],
//         error
//       );
//       // Cleanup the tokens that are not registered anymore.
//       if (
//         error.code === "messaging/invalid-registration-token" ||
//         error.code === "messaging/registration-token-not-registered"
//       ) {
//         const deleteTask = admin
//           .firestore()
//           .collection("fcmTokens")
//           .doc(tokens[index])
//           .delete();
//         tokensDelete.push(deleteTask);
//       }
//     }
//   });
//   return Promise.all(tokensDelete);
// }

// exports.sendAllNotification = functions.database.ref('/{uid}/shared_trips/').onWrite(event=>{
//     const uuid = event.params.uid;

//     console.log('User to send notification', uuid);

//     var ref = admin.database().ref(`Users/${uuid}/token`);
//     return ref.once("value", function(snapshot){
//          const payload = {
//               notification: {
//                   title: 'You have been invited to a trip.',
//                   body: 'Tap here to check it out!'
//               }
//          };

//          admin.messaging().sendToDevice(snapshot.val(), payload)

//     }, function (errorObject) {
//         console.log("The read failed: " + errorObject.code);
//     });
// })
