const functions = require("firebase-functions");
const firebaseConfigProject = (functions.config().projects || {}).zeboard || {};
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
        '~/modules/firebaseModule.js'
    ],
};
