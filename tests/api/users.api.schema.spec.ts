
//schema: type of response data
//ajv ==> node library for schema validation
//npm install ajv

import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const TOKEN = process.env.GoRestUSERAPI_Token!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}`};

//setup of ajv;
let ajv = new Ajv();

//define JSON Schema
let userschema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "name",
    "email",
    "gender",
    "status"
  ]
}

//define JSON Schema for type = array
let userschemaArray = {
  "type": "array",
  "items": userschema
}


test('POST API-  Create a users', async({ apiHelper}) => {
   let userData = {
        "name": "kapil",
        "email": `automation_${Date.now()}@gmail.com`,
        "gender": "male",
        "status": "active"
    }


   //post the user
   let createresponse = await apiHelper.post("/public/v2/users",userData, AUTH_HEADER);
   let userid = createresponse.body.id;

   //get a user
      let getuserResponse = await apiHelper.get(`/public/v2/users/${userid}`, AUTH_HEADER);
      expect(getuserResponse.status).toBe(200);

    //schema validation code
    let validate = ajv.compile(userschema);
    let isSchemaValidate = validate(getuserResponse.body);

    if(!isSchemaValidate){
        console.log("schema Errors: ", validate.errors);
    }

    expect(isSchemaValidate).toBeTruthy();

});


test('get Users API Response-  get all users', async({ apiHelper}) => {
 
   //get a user
      let getusersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
      expect(getusersResponse.status).toBe(200);

    //schema validation code
    let validate = ajv.compile(userschemaArray);
    let isSchemaValidate = validate(getusersResponse.body);

    if(!isSchemaValidate){
        console.log("schema Errors: ", validate.errors);
    }

    expect(isSchemaValidate).toBeTruthy();

});




