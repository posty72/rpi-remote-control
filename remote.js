const awsIot = require('aws-iot-device-sdk');
const exec = require('child_process').exec;
require('dotenv').config();

const device = awsIot.device({
	keyPath: './Remote.private.key',
	certPath: './Remote.cert.pem',
	caPath: './root-CA.crt',
	region: process.env.AWS_REGION,
	clientId: 'remote.node.'+Date.now(),
	host: process.env.AWS_IOT_HOST,
	protocol: 'wss',
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretKey: process.env.AWS_SECRET
});

const EVENT_NAME = 'remote/command';

device.on('connect', function() {
	console.log('connected to '+EVENT_NAME);
	device.subscribe(EVENT_NAME);
});

device.on('message', async (topic, payload) => {
	const { command, repeat } = JSON.parse(payload.toString());

	if (command) {
		let iterate = repeat || 1;
		console.info('Executing '+command+' '+iterate+' time(s)');

		while (iterate > 0) {
			exec('irsend SEND_ONCE Samsung_TV ' + command);
			iterate--;
			await sleep(0.5);
		}
	} else {
		console.log('Could not find command');
	}
});

device.on('error', function(error) {
        console.log(error);
});

function sleep(seconds = 1) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, seconds * 1000);
	})
}
