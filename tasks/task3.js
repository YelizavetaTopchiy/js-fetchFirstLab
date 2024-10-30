"Ваш код повинен зробити PATCH-запит до вказаного URL, де {userId} – це ID існуючого користувача."
"Для оновлення користувача передайте в запит нові дані, наприклад, нове ім’я."
"Поверніть відповідь від сервера з оновленими даними користувача."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"


const https = require('https');

function updateUser(id, updatedData) {
    const data = JSON.stringify(updatedData);
    const userId = String(id);
    
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        path: '/users/' + userId,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error('Failed to parse response data'));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error('Request failed: ' + error.message));
        });

        req.write(data);
        req.end();
    });
}
module.exports = updateUser;