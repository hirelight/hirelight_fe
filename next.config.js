const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
    async headers() {
        return [
            {
                // matching all API routes
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        remotePatterns: [
            process.env.NODE_ENV === "development"
                ? {
                      protocol: "http",
                      hostname: "localhost",
                      port: "5555",
                      pathname: "/api/v1/assessment-flows/files/**",
                  }
                : {
                      protocol: "http",
                      hostname: process.env.SERVER_HOSTNAME,
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
