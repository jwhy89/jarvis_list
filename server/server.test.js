const app = require('./server');
const testServer = require('supertest');

describe('Test the root path', () => {
    test( 'Test LOGOUT responds with 200',async () => {
        const response = await testServer(app).post('/api/user/logout');
        expect( response.statusCode ).toBe( 200 );
    })

    test( 'Test LOGOUT responds with 403',async () => {
        const response = await testServer(app).get('/api/user/');
        expect( response.statusCode ).toBe( 403 );
    })

    test( 'Test main HTML page comes back',async () => {
        const response = await testServer(app).get('/');
        expect( response.statusCode ).toBe( 200 );
        expect( response.text ).toContain( 'react-root' )
    })
})