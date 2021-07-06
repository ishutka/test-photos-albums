// const functions = require("firebase-functions");
// const firebaseConfigProject = (functions.config().projects || {}).zeboard || {};
// console.log('nuxtModules=>nuxt.js: ',firebaseConfigProject,' full CONFIGs:', functions.config());
import modules from "./nuxtModules.js";
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

    modules,
   
    buildModules: [],

    target: "static",
};
