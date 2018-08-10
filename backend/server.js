  const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {

  var port = parseInt(val, 10);
  console.log("poort"+val);
  if (isNaN(port)) {
    console.log("val"+val);
    return val;
  }

  if (port >= 0) {
    console.log("port"+port);
    return port;
  }

  return false;
};

const onError = error => {
  console.log(error);
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  console.log(addr);
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  console.log(bind);
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
