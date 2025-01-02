// Замість того, щоб робити фактичні HTTP-запити, використовуйте Jest, щоб налаштувати моки на реквести з Axios. 
// Напишіть тести, які імітують як успішні, так і невдалі HTTP-запити, до замоканих ендпойнтів, 
// і переконайтеся, що ваш код поводиться належним чином.


const axios = require('axios');

async function fetchData(url){
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Request failed');
  }
}

module.exports = fetchData;