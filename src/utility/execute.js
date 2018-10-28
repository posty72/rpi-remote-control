const exec = require('child_process').exec;
require('dotenv').config();

if (process.env.SIM_COMMAND) {
    module.exports = console.info;
} else {
    module.exports = exec;
}
