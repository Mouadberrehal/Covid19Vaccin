// eslint-disable-next-line @typescript-eslint/no-var-requires
const SentryCliPlugin = require('@sentry/webpack-plugin');

module.exports = {
    // see https://cli.vuejs.org/config/#devserver-proxy
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:18080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             prependData: `
    //       @import 'front/src/assets/mystyles.scss';
    //     `,
    //         },
    //     },
    // },
    pluginOptions: {
        i18n: {
            locale: 'fr',
            fallbackLocale: 'fr',
            localeDir: 'locales',
            enableInSFC: true
        }
    },

    // sourcemaps for sentry
    productionSourceMap: true,

    configureWebpack: config => {

        if (process.env.VUE_APP_VERSION !== undefined && process.env.VUE_APP_VERSION !== '') {
            // production: we do not want devtools to search for sourcemaps
            config.devtool = 'hidden-source-map';

            // let Sentry know about the info for this version
            const options = {
                release: process.env.VUE_APP_VERSION,
                include: './dist',
                ignore: ['node_modules', 'vue.config.js'],
                setCommits: {
                    repo: 'dernieredose/dernieredose',
                    commit: process.env.COMMIT_SHA,
                    auto: false
                }
            };
            return {
                plugins: [
                    new SentryCliPlugin(options),
                ]
            };
        } else {
            // development: full sourcemaps and no Sentry
            // TODO conflict with SFC i18n
            config.devtool = 'source-map';
            return { plugins: [] };
        }
    },

    chainWebpack: config => {
        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
            .loader("@intlify/vue-i18n-loader")
            .end();
    },

    // https://github.com/paleo/direct-vuex/issues/49
    transpileDependencies: ['direct-vuex']
}
