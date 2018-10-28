const awsIot = require('aws-iot-device-sdk');
const actions = require('./actions');
require('dotenv').config();

const EVENT_NAME = 'remote/command';

const device = awsIot.device({
    keyPath: './keys/Remote.private.key',
    certPath: './keys/Remote.cert.pem',
    caPath: './keys/root-CA.crt',
    region: process.env.AWS_REGION,
    clientId: `remote.node.${Date.now()}`,
    host: process.env.AWS_IOT_HOST,
    protocol: 'wss',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET,
});

device.on('connect', () => {
    console.log(`connected to ${EVENT_NAME}`);
    device.subscribe(EVENT_NAME);
});

device.on('message', async(topic, payload) => {
    const { command, amount } = JSON.parse(payload.toString());

    console.log(`Recieved command ${command}`);

    if (command) {
        actions(command, amount);
    } else {
        console.log('Could not find command');
    }
});

device.on('error', (error) => {
    console.log(error);
});
