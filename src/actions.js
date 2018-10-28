const execute = require('./utility/execute');
const sleep = require('./utility/sleep');
const commands = require('./config/commands');

const BASE_COMMAND = 'irsend SEND_ONCE Samsung_TV';

module.exports = (key, amount) => {
    switch (key) {
        case commands.ON_OFF:
            onOff();
            break;
        case commands.CYCLE_INPUT:
            cycleInput();
            break;
        case commands.MUTE:
            mute();
            break;
        case commands.VOLUME_UP:
            volumeUp(amount);
            break;
        case commands.VOLUME_DOWN:
            volumeDown(amount);
            break;
        default:
            break;
    }
};

async function volumeUp(amount = 5) {
    let iterate = amount;

    while (iterate > 0) {
        execute(`${BASE_COMMAND} KEY_VOLUMEUP`);
        iterate--;
        await sleep(0.5);
    }
}

async function volumeDown(amount = 5) {
    let iterate = amount;

    while (iterate > 0) {
        execute(`${BASE_COMMAND} KEY_VOLUMEDOWN`);
        iterate--;
        await sleep(0.5);
    }
}

async function cycleInput() {
    execute(`${BASE_COMMAND} KEY_CYCLEWINDOWS`);
    await sleep(0.5);

    execute(`${BASE_COMMAND} KEY_CYCLEWINDOWS`);
    await sleep(0.5);

    execute(`${BASE_COMMAND} KEY_OK`);
    await sleep(0.5);
}

async function onOff() {
    execute(`${BASE_COMMAND} KEY_POWER`);
}

async function mute() {
    execute(`${BASE_COMMAND} KEY_MUTE`);
}
