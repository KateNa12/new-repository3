const fetchFromWrongUrl = require('./1.1.fetchFromWrongUrl');
const axios = require('axios');

jest.mock('axios');

describe('fetchFromWrongUrl', () => {

    test('returns the correct error message for an invalid URL', async () => {
        let error = new axios.AxiosError();
        axios.get.mockRejectedValue(error);
        error.code = "ENOTFOUND";

        try {
            let result = await fetchFromWrongUrl();
            // Request should fail
            expect(true).toBe(false);
        } catch(error) {
            expect(error.message).toBe("Server not found");
        }
    });

    test('returns the correct error message for other errors', async () => {
        let error = new axios.AxiosError();
        axios.get.mockRejectedValue(error);
        error.message = "MESSAGE";

        try {
            let result = await fetchFromWrongUrl();
            // Request should fail
            expect(true).toBe(false);
        } catch(error) {
            expect(error.message).toBe("Error: MESSAGE");
        }
    });

    test('returns a server error message', async () => {
        axios.get.mockRejectedValue({response: {status: 400, statusText: "statusText"}});

        try {
            let result = await fetchFromWrongUrl();
            // Request should fail
            expect(true).toBe(false);
        } catch(error) {
            expect(error.message).toBe("Server error: 400 statusText");
        }
    });

    test('returns the correct, expected result', async () => {
        axios.get.mockResolvedValue(42);

        let result = await fetchFromWrongUrl();
        expect(result).toBe(42);
    });
        
});


 // test('Без застосування моків: перевірка коректної роботи функції fetchFromWrongUrl', async () => {
    //     try {
    //         let result = await fetchFromWrongUrl();
    //         fail("Request should fail");
    //     } catch(error) {
    //         expect(error.message).toBe("Server not found");
    //     }
    // });