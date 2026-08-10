
import { Apitest as test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.CONTACTUSERAPI_Token!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}`};

//helper --- generic function - create a fresh user
async function createuser(apiHelper:any) {
        let userData = {
    "firstName": "Elon",
    "lastName": "musk",
    "birthdate": "1999-07-10",
    "email": "elonmusk@outlook.com",
    "phone": "7452639884",
    "street1": "Electronic city",
    "street2": "Apartment A",
    "city": "London",
    "stateProvince": "LN",
    "postalCode": "12345",
    "country": "UK"
}

    let response = await apiHelper.post('/contacts', userData,  AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}

//Test 1: create a user test + verify: AAA
//post --> userid --> GET / userID ---- verify
test('POST API-  Create a users', async({ apiHelper}) => {
   //create a user
   let userResponse = await createuser(apiHelper);

   //get the user
   let response = await apiHelper.get(`/contacts/${userResponse._id}`, AUTH_HEADER);
   expect(response.status).toBe(200);
   expect(response.body.firstName).toBe(userResponse.firstName);
});

//Test 2: update a user test + verify: AAA
//post --> userid --> PUT -->  GET / userID ---- verify
test('PUT API-  UPDate a users', async({ apiHelper}) => {
   //create a user
   let userResponse = await createuser(apiHelper);

    let userUpdateData = {
    "firstName": "Elon Twitter",
    "lastName": "musk",
    "birthdate": "1996-07-10",
    "email": "elontwitter@outlook.com",
    "phone": "7452632484",
    "street1": "Bhilai sector B",
    "street2": "street no 3",
    "city": "uttar pradesh",
    "stateProvince": "KS",
    "postalCode": "12345",
    "country": "Ind"
}

   //Update the user
   let putResponse = await apiHelper.put(`/contacts/${userResponse._id}`, userUpdateData,  AUTH_HEADER);
   expect(putResponse.status).toBe(200);
   expect(putResponse.body.firstName).toBe(userUpdateData.firstName);
   expect(putResponse.status).toBe(200);

   //get the user
   let getresponse = await apiHelper.get(`/contacts/${userResponse._id}`, AUTH_HEADER);
   expect(getresponse.status).toBe(200);
   expect(getresponse.body.firstName).toBe(userUpdateData.firstName);
});

//Test 3: update a user test + verify: AAA
//post --> userid --> PATCH -->  GET / userID ---- verify
test('PATCH API-  UPDate a users', async({ apiHelper}) => {
   //create a user
   let userResponse = await createuser(apiHelper);

    let userUpdatePatchData = {
    "email": "elonmusk@gmail.com",
    "phone": "7452132789"
}

   //Update the user
   let patchResponse = await apiHelper.patch(`/contacts/${userResponse._id}`, userUpdatePatchData,  AUTH_HEADER);
   expect(patchResponse.status).toBe(200);
   expect(patchResponse.body.email).toBe(userUpdatePatchData.email);
   expect(patchResponse.body.phone).toBe(userUpdatePatchData.phone);
   expect(patchResponse.status).toBe(200);

   //get the user
   let getresponse = await apiHelper.get(`/contacts/${userResponse._id}`, AUTH_HEADER);
   expect(getresponse.status).toBe(200);
   expect(getresponse.body.email).toBe(userUpdatePatchData.email);
});

//Test 4: Delete a user test + verify: AAA
//post --> userid --> Delete(204) -->  GET / userID(404) ---- verify
test('Delete API-  delete a users', async({ apiHelper}) => {
   //create a user
   let userResponse = await createuser(apiHelper);

   //Delete the user
   let response = await apiHelper.delete(`/contacts/${userResponse._id}`,  AUTH_HEADER);
   expect(response.status).toBe(200);

   //get the user
   let getresponse = await apiHelper.get(`/contacts/${userResponse._id}`, AUTH_HEADER);
   expect(getresponse.status).toBe(404);
   
});