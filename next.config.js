const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "5555",
                pathname: "/api/v1/assessment-flows/files/**",
            },
            {
                protocol: "https",
                hostname: "hirelight.azurewebsites.net",
                pathname: "/api/v1/assessment-flows/files/**",
            },
        ],
    },
    webpack: config => {
        config.resolve.alias.canvas = false;

        return config;
    },
});

module.exports = nextConfig;
