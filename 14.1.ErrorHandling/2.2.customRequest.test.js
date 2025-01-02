const fetchCustomParams = require('./2.1.customRequestParams');
const axios = require('axios');

jest.mock('axios');


test('Verifying that headers and parameters are correctly included in the request', async () => {
    const mockedResponse = {
        data: { success: true },
        status: 200,
        statusText: "OK",
        headers: { 'content-type': 'application/json' },
        config: {},
    };

    axios.post.mockResolvedValue(mockedResponse);

    const response = await fetchCustomParams();

   
    expect(axios.post).toHaveBeenCalledWith(
        'https://google.com', // Correct URL
        {
            email: "kateryna.naimark@gmail.com", // Correct payload
            password: "1234"
        },
        {
            headers: {
                header: "custom value" // Correct headers
            }
        }
    );
});

