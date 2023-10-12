const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    webpack: config => {
        config.resolve.alias.canvas = false;

        return config;
    },
};

module.exports = nextConfig;
