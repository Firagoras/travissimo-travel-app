/* --- Express Server Setup --- */

import { app } from './server.js';

const PORT = '8085';

app.listen(PORT, listening);

function listening() {
  console.log('Server is running on localhost', PORT);
}

