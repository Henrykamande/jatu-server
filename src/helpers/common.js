
const fetch = require('node-fetch');

export function handleErr(res, err, msg) {
    console.log(err);
    return res.send({ state: false, err, msg });
}

export function distanceCalculator() {
}


export function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

export function sendSms(data) {
    const headers = {
        'Content-Type': 'application/json',
        'ApiKey': 'f8f48fe90952455ab0a653fbf96d82eb'
    };
    return fetch('http://api.sematime.com/v1/1559206271538/messages', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => console.log('Success:', JSON.stringify(response)));
}


export function randomString() {
	let randomNumber = Math.random().toString(36).substring(7);
	return randomNumber;
}