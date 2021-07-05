const functions = require('firebase-functions');
const firebaseConfigProject = (functions.config().projects || {}).zeboard || {};
export default {
    mode: "spa",

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
                    apiKey: firebaseConfigProject.["api-key"] || process.env.FIREBASE_API_KEY,
                    authDomain: "ishutka-zeboard.firebaseapp.com",
                    projectId: "ishutka-zeboard",
                    storageBucket: "ishutka-zeboard.appspot.com",
                    messagingSenderId: firebaseConfigProject.["messaging-sender-id"] || process.env.FIREBASE_MESSAGING_SENDER_ID,
                    appId: ((firebaseConfigProject.apps || {}).["test-photos-albums"] || {}).["measurement-id"] || process.env.FIREBASE_APP_ID,
                    measurementId: ((firebaseConfigProject.apps || {}).["test-photos-albums"] || {}).["measurement-id"] || process.env.FIREBASE_MEASUREMENT_ID,
                },
                onFirebaseHosting: true,
                services: {
                    analytics: true,
                },
            },
        ],
    ],
};
