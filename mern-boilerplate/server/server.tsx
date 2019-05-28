import * as http from 'http';
import app from './app';

function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || 3000);
app.listen(port, () => console.log(`mern-boilerplate listening on port ${port}!`))
