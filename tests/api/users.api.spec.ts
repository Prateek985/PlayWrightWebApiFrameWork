
import { test, expect } from '@playwright/test';

let AUTH_Token = { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTFhODVlZjY0Y2QwOTAwMTU1MWNhMTQiLCJpYXQiOjE3ODIzOTkwMTN9.C5CK6Lrs_oN4Ao6Q_bmSks737XIZqPU8-jCTOsu1Q0k"};


test('get user test', async ({request}) => {
     let response = await request.get("https://gorest.co.in/public/v2/users",{
        headers: AUTH_Token
     });

    console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status);
    console.log(response.statusText);

});

test('create user test', async ({request}) => {
     
    let userData = {
        name: 'uday',
        email: 'uday@gmail.com',
        gender: 'male',
        status: 'active'
    }
    
    let response = await request.post("https://gorest.co.in/public/v2/users",{
        headers: AUTH_Token,
        data: userData
     });

    console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status);
    console.log(response.statusText);

});

test('Update user test', async ({request}) => {
     
    let userData = {
        name: 'uday',
        email: 'uday@gmail.com',
        gender: 'male',
        status: 'active'
    }
    
    let response = await request.put("https://gorest.co.in/public/v2/users/8501947",{
        headers: AUTH_Token,
        data: userData
     });

    console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status);
    console.log(response.statusText);

});


test('Delete user test', async ({request}) => {
    
    let response = await request.delete("https://gorest.co.in/public/v2/users/8501947",{
        headers: AUTH_Token,
     });

    
    let jsonBody = await response.json();
    console.log(response.status);
    console.log(response.statusText);

});