import { apiCall } from './fetchCalls';

describe('apiCall', () => {
    beforeEach(() => {
        window.fetch = jest.fn(() => {
            return Promise.resolve({
                status: 200,
                ok: true
            })
        })
    })

    it('should return a resolved response when successful', async () => {
        let response = await apiCall('https://api.harvardartmuseums.org/object/323816?apikey=b59b0050-58c4-11ea-b831-f76084e9f972&size=100')
        expect(response).toEqual({ status: 200, ok: true })
    })

    it('should return an error when unsuccessful', async () => {
        let error = new Error('There was an error fetching data')
        window.fetch = jest.fn(() => {
            return Promise.resolve({
                status: 200,
                ok: false
            })
        })
        await expect(apiCall('https://api.harvardartmuseums.org/object/323816?apikey=b59b0050-58c4-11ea-b831-f76084e9f972&size=100')).rejects.toEqual(error)
    })
})