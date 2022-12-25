module.exports = {
  apps: [
    {
      name: "JCWD-2202-04", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8204,
      },
      time: true,
    },
  ],
};
