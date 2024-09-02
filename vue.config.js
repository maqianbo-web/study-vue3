/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    // antv-x6需要
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@vue/composition-api': 'vue',
            },
        },
    },
});
