import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "react-study-2",
  private_key_id: "bc747c57cd705fc51b5ba493fb1a0009d0139548",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC8N6HcUaWlRAXl\nFqYdZUFYmK8CJIT0cHfsijQpA6eCaShlfJfbyMtYYwntwprkQPgLuK5FwqHee/rq\n4ScyjaPxYeNCOElYQFOi6jIDSH2IWRoG4W+ZQkTVuKEuXEGlILbtWrUPEi6nH/yJ\nIUYn/ETgsEUnBAB6DsCTWfzRm1OgyvJaStlBUrfenYwJ9/RG7MAZab7O3QvAI7FO\nzjZ+59h8NiX4UkRx4lDti9x3tAR1kqGRJZ206TSkISWdK2fEhuXg9GoIPMMUZ6KI\nrjrQAiqRxBYtxvxP0A/caGZGhB71lAKmJfM1LU2DvhpfOR4lwSM7UzR+r8vmgqsK\nzhMYEGa3AgMBAAECggEAIKdeM4UOwe9dPnOBelQY1DAZHLwNPQNOKwGHLx5tL1jj\nI0hMaFsbvEfibxd2G+eRoSb3RS8ROjI0RA+v5ztfl/8tmE1/nAn8+KS87IjlDoS2\n2T6/R82Rd6rCe/KRiP51/hPgma7D3UbVX00giMthf8HVHYG6O3LXwji4ffz+s0R1\nlebxTUhbfqamxt7I5frFNVbuNGdFVwgr8fwanGsLG6oDu+kFx0ojfMQX7YVi6gVo\nWUoeCIhQyNSEHwNAEq+sH58QuHbjrFxZhQL+Bv1BME7zu/kJdYxI0NeWMJQqYTDH\nx/XVHSoaPX0KvgVFCrimB/m7oegy9V974aA2hzBp0QKBgQD6koYJDGTQUn0ApXon\nFO1re9LZYJLAPEIKhI+LU1+9bpy+4aMakoyCDyXzyZqwNI9gxDGTvWJKRRKel2ji\nJxtYofCvocD7f3wxN9f5XKh8E2ccxKatFW58yv+zeDcPljc6l9lE+fPhHGpgqRIf\nNIDIWW0L7yYY4/16S0FkIbd19QKBgQDAS1Y8UhJoLXgY49ksmSudM+YpIIirG9OI\n7lu+vyZ9VuJSMi5WZpwJ4jwx3SBjn29dG/jITCHKsFpiBI7kZ/ls7hFGUlGJouD0\nAm1D+QSRxhgTgfdBE0FTAkUCxtzpbRIZOsx0KgpKJPfEczD4AgKCxAEBb+KSDpQc\nxk1SWPGSewKBgCJgPbE6GQ6XcnzHNvXrohLP3wJhhGCJI8pLm2HS41yaszhgvj6k\nAlDJgTxr2SP5Yf41jFOndLeZuE83mHUGRnMnbFy8BTy7pa8e6StVseurwcapl/BA\n83J9aw0VHgCubA9Gy9DxtaqZemKeb1UGn/BcjGBJw+FATgMcFfGFyqSNAoGAU6nz\nkTccLxtpX1rzCIZ0BWepQkeXbusidDdQz4MXWf1NZvnSU2E9jsdR7VgKWY3qxBYB\nfhQxt6BXEsJs8U+TpCNIfNIgC8REH6ZWp/ZWWJ5Zp1MqorOf/l/EatrfDuiXsUZ1\n4izQYUYITv7XVXB6ay6gSWHGsEmLg6F7ztJH+LUCgYBYZHrHXWypxVlIaRaaF+S9\npgpkfGvFo7a2gYohDFlKhIcW4cgjg0gnFZxadWN2P4f0qJFecMSAkyuN1ACVf09O\nIypCHO+hAxrr5pc6E+15hjhzJ9GCNznWjcew1tc7XyTMStfFc/4DmxSTOGv5LN1X\nQ6Q9NMDIq50USXt/pnO9jg==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fud31@react-study-2.iam.gserviceaccount.com",
  client_id: "101111099341352601246",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fud31%40react-study-2.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

let app;
if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

console.log("Firebase initialized (server)", app);

export const validateRequest = async (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    const decodedToken = await app.auth().verifyIdToken(token);
    // console.log(decodedToken);
    // const userId = decodedToken.user_id;
    // const user = await getUserFromDatabase(userId);
    // return user;
    return decodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
