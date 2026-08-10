

import { test, expect } from '@playwright/test';

//web app ---> intercept the network calls and log there
//** == wildcard -- matched all the urls... */

// intercept the network call
test('POST API-  Create a users', async({ page}) => {
   
    await page.route('**/*', async(route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue();  //url: === capture and continue ./..url2 -- capture -- continue
    })

    await page.goto("");
});

//intercept and mocking
//mocking: fake data/response

test('mock server data api', async({ page}) => {

    let fakeProducts = [
        {name: 'Fake Macbook Pro', price: '$5900'},
        {name: 'Fake Iphone Pro', price: "$599"}
    ];

    await page.route('**/index.php?route=product/search&search=macbook', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts),
        });
    })

    await page.goto("");

    let fakeJson = await page.evaluate(async ()=>{
        let fakeRes = await fetch("/index.php?route=product/search&search=macbook")
        return await fakeRes.json();
    });

    console.log("fake response Json", fakeJson);
});