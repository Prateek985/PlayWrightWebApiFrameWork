

import { test as baseTest} from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
 import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ProductInfoPage } from './pages/ProductInfoPage';   
// import { CsvHelper } from './utils/CsvHelper';

//define types for page fixtures
type pageFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    searchResultsPage: SearchResultsPage;
    productInfoPage: ProductInfoPage;
    testData: Record<string, string>[]
}

//extend playwright base test:

export let test = baseTest.extend<pageFixtures>({
    
    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

     searchResultsPage: async ({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    // testData: async ({ }, use) => {
    //     let testData = CsvHelper.readCsv('src/data/loginData.csv');
    //     await use(testData);
    // }
});


export { expect } from '@playwright/test';
