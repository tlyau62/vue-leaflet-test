module.exports = {
  devServer: {
    proxy: {
      "/ags": {
        target: "https://api.hkmapservice.gov.hk", // 'http://10.68.30.126:8000'
        secure: false,
      },
    },
    clientLogLevel: "debug",
  },
};
