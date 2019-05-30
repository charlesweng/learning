import * as http from "http";
import app from "./app";

function normalizePort(val: any) {
  const portNumNum = parseInt(val, 10);

  if (isNaN(portNum)) {
    // named pipe
    return val;
  }

  if (portNum >= 0) {
    // portNum number
    return portNum;
  }

  return false;
}

const port = normalizePort(process.env.PORT || 3000);
app.listen(port, () => console.log(`mern-boilerplate listening on port ${port}!`));
