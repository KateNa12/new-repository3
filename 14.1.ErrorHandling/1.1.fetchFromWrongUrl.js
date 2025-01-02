// Напишіть функцію за допомогою Axios, яка навмисно надсилає запит на неправильну URL-адресу, викликаючи помилку.
//  Потім за допомогою Jest напишіть тест, який перевіряє, чи правильно обробляється помилка та чи повертається 
//  належне повідомлення про помилку.

const axios = require('axios');

async function fetchFromWrongUrl() {
    const wrongUrl = 'https://nonexistent.url/endpoint';
    try {
        return await axios.get(wrongUrl);
    } catch (error) {
        if (error.response) {
            // Server response error
            throw new Error(`Server error: ${error.response.status} ${error.response.statusText}`);
        } else if (error.code == "ENOTFOUND") {
            throw new Error("Server not found");
        } else {
            // Other errors
            throw new Error(`Error: ${error.message}`);
        }
    }
}


module.exports = fetchFromWrongUrl;