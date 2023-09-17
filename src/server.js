// server.js
const { createServer } = require("http");
const { parse } = require("url");

const { default: next } = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        // Extract the subdomain from the hostname
        const subdomain = req.headers.host.split(".")[0];

        // Handle organization-specific pages
        if (subdomain !== "www" && subdomain !== "hirelight") {
            // Pass the subdomain as a query parameter to the page
            app.render(req, res, pathname, { ...query, subdomain });
        } else {
            // For other pages, use Next.js default handling
            handle(req, res, parsedUrl);
        }
    }).listen(3000, err => {
        if (err) throw err;
        console.log("> Ready on http://localhost:3000");
    });
});
