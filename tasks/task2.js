"Ваш код повинен зробити POST-запит до вказаного URL."
"Для створення нового користувача, передайте в запит наступні дані:"
"name: ваше ім’я"
"email: ваш email"
"Поверніть відповідь від сервера після створення користувача."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"


const https = require('https');

function addNewUser(userInfo) {
    const userDataString = JSON.stringify({
        name: userInfo.name,
        email: userInfo.email
    });

    const requestSettings = {
        hostname: 'jsonplaceholder.typicode.com',
        path: '/users',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': userDataString.length
        }
    };

    return new Promise((onSuccess, onError) => {
        const apiCall = https.request(requestSettings, (serverAnswer) => {
            let receivedInfo = '';
            
            serverAnswer.on('data', (dataChunk) => {
                receivedInfo += dataChunk;
            });
            
            serverAnswer.on('end', () => {
                onSuccess(JSON.parse(receivedInfo));
            });
        });

        apiCall.on('error', (errorInfo) => {
            onError(errorInfo);
        });

        apiCall.write(userDataString);
        apiCall.end();
    });
}

module.exports = addNewUser;