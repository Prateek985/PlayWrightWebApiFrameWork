

import { Apitest as test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.GoRestUSERAPI_Token!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}`};

//helper --- generic function - create a fresh user
async function createuser(apiHelper:any) {
        let userData = {
        "name": "kapil",
        "email": `automation_${Date.now()}@gmail.com`,
        "gender": "male",
        "status": "active"
        }

    let response = await apiHelper.post('/public/v2/users', userData,  AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}

//Test 1: create a user test + verify: AAA
//post --> userid --> GET / userID ---- verify
test('POST API-  Create a users', async({ apiHelper}) => {
   //create a user
   let userResponse = await createuser(apiHelper);

   //get the user
   let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
   expect(response.status).toBe(200);
   expect(response.body.name).toBe("kapil");
});


//Test 2: update a user test + verify: AAA
//post --> userid --> PUT -->  GET / userID ---- verify
test('PUT API-  UPDate a users', async({ apiHelper}) => {
   //create a user
   let userResponse = await createuser(apiHelper);

    let userUpdateData = {
        "name": "kapilsharma",
        "status": "inactive"
    }

   //Update the user
   let response = await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdateData,  AUTH_HEADER);
   expect(response.status).toBe(200);
   expect(response.body.name).toBe(userUpdateData.name);
   expect(response.body.status).toBe(userUpdateData.status);

   //get the user
   let getresponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
   console.log(getresponse);
   expect(getresponse.status).toBe(200);
   expect(getresponse.body.name).toBe(userUpdateData.name);
});


//Test 3: Delete a user test + verify: AAA
//post --> userid --> Delete(204) -->  GET / userID(404) ---- verify
test('Delete API-  delete a users', async({ apiHelper}) => {
   //create a user
   let userResponse = await createuser(apiHelper);

   //Delete the user
   let response = await apiHelper.delete(`/public/v2/users/${userResponse.id}`,  AUTH_HEADER);
   expect(response.status).toBe(204);

   //get the user
   let getresponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
   expect(getresponse.status).toBe(404);
   expect(getresponse.body.message).toBe("Resource not found");
});