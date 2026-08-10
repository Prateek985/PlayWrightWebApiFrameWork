
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage{

//private Locators 
private readonly header: Locator;
private readonly productImages: Locator;
private readonly productmetaData: Locator;
private readonly productPricing: Locator;
private map: Map<string, string | number>;


//const.... of the class init the locators
constructor(page: Page){
    super(page);
    this.header = page.getByRole("heading", {name: 'MacBook Pro', level: 1});
    this.productImages = page.locator('div#content li img');
    this.productmetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
    this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
    this.map = new Map<string, string | number>;
};


//this method is returning the actual product data: headers, images, metadata, pricing Data
async getProductInfo():Promise<Map<string, string | number>>{
    this.map.set('ProductHeader', await this.getProductHeader());
    this.map.set('ProductImage', await this.getProductImageCount());
    await this.getProductMetaData();
    await this.getProductPricingData();
    return this.map;
}

//actions
async getProductHeader(): Promise<string> {
     return await this.header.innerText();
}

async getProductImageCount(): Promise<number> {
    //await this.page.waitForTimeout(4000);
    await this.productImages.first().waitFor({ state: 'visible'});
      return await this.productImages.count();
}

async getProductMetaData(): Promise<void>{
    let metaData = await this.productmetaData.allInnerTexts();
    for(let data of metaData){
        let meta = data.split(":");
        let metakey = meta[0].trim();
        let metaVal = meta[1].trim();
        this.map.set(metakey, metaVal);
    }
}

async getProductPricingData(): Promise<void>{
    let priceData = await this.productPricing.allInnerTexts();
        let ProductPrice = priceData[0].trim();
        let extraPrice = priceData[1].split(":")[1].trim();
        this.map.set('ProductPrice', ProductPrice);
        this.map.set('extraPrice', extraPrice);
    }
}

