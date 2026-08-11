

import { test, expect } from '@playwright/test';

let OAUTH_CONFIG = {
    tokenURL: "https://test.api",
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!

}

let accessToken: string;

test.beforeEach('POST ---- generate the access token', async ({ request }) => {
    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    });

    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    accessToken = jsonResponse.accessToken;
});


test('GET --get location data', async ({ request }) => {    
    
    let baseurl = "https://test.api.amadeus.com";
    let endpointurl = "/v1/reference-data/locations";

   let queryParam = {
      subType: 'CITY,AIRPORT',
      keyword: 'MUC',
      countryCode: 'DE'
   };

   let locationResponse = await request.get(`${baseurl}${endpointurl}`, {
         headers:{
            Authorization: `Bearer ${accessToken}`
         },
         params: queryParam
   });
   
   expect(locationResponse.status()).toBe(200);
   
});