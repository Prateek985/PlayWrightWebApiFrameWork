

import { test as baseTest, expect} from '@playwright/test';
import { ApiHelper } from '../api/ApiHelper';


//define the types of api fixtures
type ApiFixtures = {
    apiHelper: ApiHelper;

}

export let Apitest = baseTest.extend<ApiFixtures>({
    
    apiHelper: async ({ request }, use) => {
        let apiHelper = new ApiHelper(request,
            process.env.API_BASE_URL!  // this colon is for it might give you null 
        );
        await use(apiHelper);
    },

    
});

export { expect } from '@playwright/test';
