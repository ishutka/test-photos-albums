
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

    modules: [
        '~/modules/firebaseModule.js',
    ],
    buildModules: [
    ],

    target: 'static'
};
