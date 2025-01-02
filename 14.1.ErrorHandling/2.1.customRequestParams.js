//  Створіть функцію за допомогою Axios, щоб зробити запит, який містить кастомні хедери та параметри URL-адреси.
//   Напишіть тест Jest, щоб переконатися, що заголовки та параметри правильно включені в запит.
// https://someunexistingsite/user/login

const axios = require('axios');

async function fetchCustomParams() {
    return await axios.post('https://google.com',
        {
            "email": "kateryna.naimark@gmail.com",
            "password": "1234"
        },
        {
            headers: {
                "header": "custom value"
            }
        }
    )
}
 

fetchCustomParams().then((result) => {
    console.log(1);
    console.log(result);
}).catch((error) => {
    console.log(2);
    console.log(error.headers);
})

module.exports = fetchCustomParams;
