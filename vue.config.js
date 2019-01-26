const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@atoms": path.resolve(__dirname, "src/components/atoms"),
        "@molecules": path.resolve(__dirname, "src/components/molecules"),
        "@organisms": path.resolve(__dirname, "src/components/organisms"),
        "@sections": path.resolve(__dirname, "src/components/sections"),
        "@layouts": path.resolve(__dirname, "src/components/layouts"),
        "@views": path.resolve(__dirname, "src/views"),
        "@svg": path.resolve(__dirname, "src/components/00-svg"),
        "@images": path.resolve(__dirname, "src/assets/images"),
        "@icons": path.resolve(__dirname, "src/assets/images/icons"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@data": path.resolve(__dirname, "src/data"),
        "@router": path.resolve(__dirname, "src/router"),
        "@store": path.resolve(__dirname, "src/store"),
        "@tests": path.resolve(__dirname, "tests"),
        "@api": path.resolve(__dirname, "src/api"),
        "@directives": path.resolve(__dirname, "src/directives"),
        "@mixins": path.resolve(__dirname, "src/mixins")
      }
    }
  }
};
