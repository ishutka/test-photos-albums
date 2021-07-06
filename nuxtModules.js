const modules = [];

 if (process.env.NODE_ENV!=='development') {
    const functions = require("firebase-functions");
    const firebaseConfigProject = (functions.config().projects || {}).zeboard || {};
    modules.push([
        "@nuxtjs/firebase",
        {
            config: {
                apiKey: firebaseConfigProject["api-key"] || "",
                authDomain: "ishutka-zeboard.firebaseapp.com",
                projectId: "ishutka-zeboard",
                storageBucket: "ishutka-zeboard.appspot.com",
                messagingSenderId:
                    firebaseConfigProject["messaging-sender-id"] || "",
                appId:
                    ((firebaseConfigProject.apps || {})[
                        "test-photos-albums"
                    ] || {})["app-id"] || "",
                measurementId:
                    ((firebaseConfigProject.apps || {})[
                        "test-photos-albums"
                    ] || {})["measurement-id"] || "",
            },
            onFirebaseHosting: true,
            services: {
                analytics: true,
            },
        },
    ]);
}

export default modules;