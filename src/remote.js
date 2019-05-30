const WebSocket = require('ws');
const actions = require('./actions');
require('dotenv').config();

const url = process.env.WS_ENDPOINT;
const ws = new WebSocket(url, {
    protocol: 'wss',
});

ws.on('connect', () => {
    console.log(`connected to ${url}`);
});

ws.on('message', (payload) => {
    const { command, amount } = JSON.parse(payload.toString());

    console.log(`Recieved command ${command}`);

    if (command) {
        actions(command, amount);
    } else {
        console.log('Could not find command');
    }
});
