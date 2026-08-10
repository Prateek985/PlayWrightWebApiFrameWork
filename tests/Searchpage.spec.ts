
import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {
     await loginPage.goToLoginPage();
     await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD);
})


let productData = CsvHelper.readCsv('src/data/productData.csv');
for(const row of productData){

    test(`verify search with products - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage }) => {
       await homePage.doSearch(row.searchkey)
       expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
    });

}
test('verify user is able to land on the product page', async ({ homePage, searchResultsPage, page }) => {
        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        expect(await page.title()).toBe('MacBook Pro');
});
