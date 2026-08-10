
import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

test.beforeEach(async ({ loginPage }) => {
     await loginPage.goToLoginPage();
})

test('login page title test', async ({ loginPage }) => {
     const pageTitle = await loginPage.getLoginPageTitle();
     console.log('login page title', pageTitle);
     expect(pageTitle).toBe('Account Login');
});

test('forgot password link exist test', async ({ loginPage }) => {
       expect(await loginPage.isForgetPwdLinkExist()).toBeTruthy();
});

test('do login test', async ({ loginPage, homePage }) => {
     await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
     expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
     expect.soft(await homePage.getHomePageTitle()).toBe('Account Login');
});


//Data-Driven approch part no 1 = without fixtures, parellel mode, read csv data directly and loop the test method row wise....

// test('login to app using wrong credentials with Data driven test', async ({ loginPage, testData }) => {
//         for(let row of testData){
//            await loginPage.doLogin(row.username, row.password);
//            expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
//           } 
//      });

// //Data-Driven approch part no 2 = sequence mode --- only one test is running with test data one by one using testdata from fixtures  
// let testData = CsvHelper.readCsv('src/data/loginData.csv');
// for(let row of testData){
//      test(`invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage}) => {
//            await loginPage.doLogin(row.username, row.password);
//            expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
//      });
// }     


 //Data-Driven approch part no 3 = sequence mode --- read excel data directly and loop the test method row wise....  
let loginTestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx', 'login');
for(let row of loginTestData){
     test(`invalid login test with excel data - ${row.username} - ${row.password}`, async ({ loginPage}) => {
           await loginPage.doLogin(row.username, row.password);
           expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
     });
}   

 //Data-Driven approch part no 3 = sequence mode --- read JSON data directly and loop the test method row wise....  
let loginJSTestData = JsonHelper.readJson('src/data/loginData.json');
for(let row of loginJSTestData){
     test(`invalid login test with excel data - ${row.username} - ${row.password}`, async ({ loginPage}) => {
           await loginPage.doLogin(row.username, row.password);
           expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
     });
} 