const url = require("url");
var http = require("http");
const { parse } = require("querystring");

const port = 5353;

http
  .createServer(function (req, res) {
    var vars = url.parse(req.url, true).query;
    let path = url.parse(req.url).pathname;
    switch (path) {
      case "/":
        let html = "hello";

        res.writeHead(200);
        res.end(html);
        break;
      case "/form":
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString(); // convert Buffer to string
          });
          req.on("end", async () => {
            let post = parse(body);

            if ("isi" in post) {
              res.writeHead(200);
              res.end(JSON.stringify(post));
            } else {
              res.writeHead(200, { "content-type": "text/plain" });
              res.write("Failed");
              res.end();
            }
          });
        } else {
          let html = `<!doctype html><html><body><form method="post" action="">
            <input type="text" name="isi"/>
            <button type="submit" name="tombol">Proses</button>
          </form></body></html>`;
          res.end(html);
        }
        break;
      default:
        res.writeHead(404);
        res.end("Not Found");
        break;
    }
  })
  .listen(port);
console.log("start port: " + port);
