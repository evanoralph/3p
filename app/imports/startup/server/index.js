// Import server startup through a single index entry point

import startApi from './register-api.js';
import seed from './seed-data';

startApi();
seed();