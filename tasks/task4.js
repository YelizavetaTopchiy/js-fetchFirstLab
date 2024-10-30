"Ваш код повинен зробити DELETE-запит до вказаного URL, де {userId} – це ID користувача, якого потрібно видалити."
"Поверніть статус відповіді сервера після видалення."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"


const https = require('https');

function removeUserData(userId) {
    const serverConfig = {
        hostname: 'jsonplaceholder.typicode.com',
        path: `/users/${userId}`,
        method: 'DELETE'
    };

    return new Promise((onSuccess, onFail) => {
        const serverRequest = https.request(serverConfig, (serverResponse) => {
            let responseContent = '';
            
            serverResponse.on('data', (dataFragment) => {
                responseContent += dataFragment;
            });
            
            serverResponse.on('end', () => {
                try {
                    onSuccess({
                        status: serverResponse.statusCode,
                        message: 'Користувача успішно видалено'
                    });
                } catch (err) {
                    onFail(new Error('Помилка обробки відповіді сервера: ' + err.message));
                }
            });
        });

        serverRequest.on('error', (err) => {
            onFail(new Error('Помилка підключення до сервера: ' + err.message));
        });

        serverRequest.end();
    });
}

module.exports = removeUserData;