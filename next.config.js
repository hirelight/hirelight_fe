const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    webpack: config => {
        config.resolve.alias.canvas = false;

        return config;
    },
});

module.exports = nextConfig;
