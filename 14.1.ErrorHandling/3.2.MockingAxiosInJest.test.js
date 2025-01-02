
const fetchData = require ('./3.1.MockingAxiosinJest');
const axios = require('axios');

jest.mock('axios');

describe('fetchData', () => {
  const mockUrl = 'https://api.example.com/data';

  test('should return data when the request is successful', async () => {
    // Setting up the mock for a successful request
    const mockData = { id: 1, name: 'Test' };
    axios.get.mockResolvedValue({ data: mockData });

    const data = await fetchData(mockUrl);

    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(mockUrl);
  });

  test('should throw an error with a custom message when the request fails', async () => {
    // Setting up the mock for failed request
    const mockError = { response: { data: { message: 'Not Found' } } };
    axios.get.mockRejectedValue(mockError);

    // Check that function causes an error
    await expect(fetchData(mockUrl)).rejects.toThrow('Not Found');
    expect(axios.get).toHaveBeenCalledWith(mockUrl);
  });

  test('should throw a default error message if no response is available', async () => {
    // Setting up the mock for an unanswered request
    const mockError = {};
    axios.get.mockRejectedValue(mockError);

    // Check that function causes an error
    await expect(fetchData(mockUrl)).rejects.toThrow('Request failed');
    expect(axios.get).toHaveBeenCalledWith(mockUrl);
  });
});