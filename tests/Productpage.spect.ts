
import { test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
     await loginPage.goToLoginPage();
     await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD);
     
})

test('verify product images count', async ({homePage, searchResultsPage, productInfoPage}) => {
     await homePage.doSearch('macbook');
     await searchResultsPage.selectProduct('MacBook Pro');
     let imgCount = await productInfoPage.getProductImageCount();
     console.log('total images: ', imgCount);
     expect(imgCount).toBe(4);
});

test('verify product Information/Data', async ({homePage, searchResultsPage, productInfoPage}) => {
     await homePage.doSearch('macbook');
     await searchResultsPage.selectProduct('MacBook Pro');
     let actualProductInfoMap = await productInfoPage.getProductInfo();
     console.log('Actual Product Details:', actualProductInfoMap);
     expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
     expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
     expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
     expect.soft(actualProductInfoMap.get('Reward Point')).toBe('800');
     expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000');
     expect.soft(actualProductInfoMap.get('ExtraTaxPrice')).toBe('$2,000');

});


