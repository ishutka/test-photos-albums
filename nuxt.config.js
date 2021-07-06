const functions = require("firebase-functions");
const firebaseConfigProject = (functions.config().projects || {}).zeboard || {};
// require('dotenv').config()
// console.log("process.env.NODE_EN: ", process.env.FIREBASE_API_KEY,process.env.NODE_ENV==='development');
export default {
    mode: "spa",
    dev: "develop",
    head: {
        title: "CC",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
        ],
    },

    plugins: [],

    buildModules: [
        [
            "@nuxtjs/firebase",
            {
                config: {
                    apiKey:
                        firebaseConfigProject["api-key"] ||
                        process.env.FIREBASE_API_KEY,
                    authDomain: "ishutka-zeboard.firebaseapp.com",
                    projectId: "ishutka-zeboard",
                    storageBucket: "ishutka-zeboard.appspot.com",
                    messagingSenderId:
                        firebaseConfigProject["messaging-sender-id"] ||
                        process.env.FIREBASE_MESSAGING_SENDER_ID,
                    appId:
                        ((firebaseConfigProject.apps || {})[
                            "test-photos-albums"
                        ] || {})["measurement-id"] ||
                        process.env.FIREBASE_APP_ID,
                    measurementId:
                        process.env.NODE_ENV != "development"
                            ? ((firebaseConfigProject.apps || {})[
                                  "test-photos-albums"
                              ] || {})["measurement-id"]
                            : "",
                },
                onFirebaseHosting: process.env.NODE_ENV != "development",
                services: {
                    analytics: process.env.NODE_ENV != "development",
                },
            },
        ],
    ],
};
