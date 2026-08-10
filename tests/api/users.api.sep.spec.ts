
import {Apitest as test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.GoRestUSERAPI_Token!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}`};

let userId: number;

test.describe.serial('running e2e go rest crud api tests', () => {
//GET Test:-
test('GET API-  get all users', async({ apiHelper}) => {

    let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

})

test('POST API-  Create a users', async({ apiHelper}) => {

    let userData = {
        name: 'uday',
        email: 'uday@gmail.com',
        gender: 'male',
        status: 'active'
    }

    let response = await apiHelper.post('/public/v2/users', userData,  AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    userId = response.body.id;
    console.log("Created user id:", userId);
})


test('PUT API-  Update a users', async({ apiHelper}) => {

    let userUpdateData = {
        name: 'uday API',
        status: 'inactive'
    }

    let response = await apiHelper.put(`/public/v2/users/${userId}`, userUpdateData,  AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userUpdateData.name);
    expect(response.body.status).toBe(userUpdateData.status);
})


test('delete API-  delete a users', async({ apiHelper}) => {

    let response = await apiHelper.put(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(response.status).toBe(204);
})

});