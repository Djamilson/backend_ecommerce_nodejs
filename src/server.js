import app from './app';
import { port } from './config/config';

app.listen(port || 3000, () => {
  // const ip = require('ip')
  // console.log(ip.address())
  // console.log('Started at http://localhost:%d', port)
});
