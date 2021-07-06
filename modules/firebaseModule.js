export default function() {
    const { nuxt } = this;
    console.log("FROM FIREBASEE MODULE: ", nuxt.options.dev);
    if (nuxt.options.dev === false) {
        return [
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
                        ] || {})["measurement-id"] || "",
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
        ];
    }
}
