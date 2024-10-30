"Ваша функція повинна робити GET-запит до вказаного URL і отримати дані."
"Поверніть дані користувачів у форматі масиву"
"Дані мають включати такі поля, як id та name."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"

const https = require('https');

function fetchUsers() {
    return new Promise((success, failure) => {
        const apiRequest = https.get('https://jsonplaceholder.typicode.com/users', (serverResponse) => {
            let receivedData = '';

            serverResponse.on('data', (dataFragment) => {
                receivedData += dataFragment;
            });

            serverResponse.on('end', () => {
                try {
                    const allUserData = JSON.parse(receivedData);
                    const simplifiedUsers = allUserData.map(person => ({
                        id: person.id,
                        name: person.name
                    }));
                    success(simplifiedUsers);
                } catch (processError) {
                    failure(new Error('Не вдалося обробити отримані дані: ' + processError.message));
                }
            });
        });

        apiRequest.on('error', (connectionError) => {
            failure(new Error('Не вдалося отримати дані з сервера: ' + connectionError.message));
        });
    });
}

module.exports = fetchUsers;