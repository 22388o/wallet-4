const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");
const { createServer, request } = require("http");

const HTTP_SERVER_PORT = 5001 || process.env.PORT;
const ESBUILD_SERVE_PORT = 5002;

const clients = [];

esbuild
  .build({
    bundle: true,
    sourcemap: true,
    entryPoints: ["./src/index.tsx"],
    outdir: "dist",
    banner: {
      js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();',
    },
    watch: {
      onRebuild(error) {
        clients.forEach(res => res.write("data: update\n\n"));
        clients.length = 0;
        console.log(error ? error : "...");
      },
    },
  })
  .then(() => {
    fs.cp(path.resolve("public"), path.resolve("dist"), { recursive: true }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

esbuild.serve({ servedir: "./dist", host: "localhost", port: ESBUILD_SERVE_PORT }, {}).then(() => {
  createServer((req, res) => {
    const { url, method, headers } = req;

    if (req.url === "/esbuild") {
      return clients.push(
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        }),
      );
    }

    const path = ~url.split("/").pop().indexOf(".") ? url : `/index.html`; //for PWA with router

    req.pipe(
      request({ hostname: "0.0.0.0", port: ESBUILD_SERVE_PORT, path, method, headers }, prxRes => {
        res.writeHead(prxRes.statusCode, prxRes.headers);
        prxRes.pipe(res, { end: true });
      }),
      { end: true },
    );
  }).listen(HTTP_SERVER_PORT);
});
