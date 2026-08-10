

import{ APIRequestContext } from '@playwright/test';

export class ApiHelper{
    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string){
        this.request = request;
        this.baseURL = baseURL;
    }

    //GET

    async get(endPoint: string, headers?: Record<string, string>){
        let response = await this.request.get(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        let body = null;
       try {
             body = await response.json();
            } catch (error) {
        // If parsing fails (e.g., empty response from a DELETE request), default to null or empty string
             body = null; 
           }
        return{
            status: response.status(),
            body: body
        }
    }

    //POST

    async post(endPoint: string,data: object,  headers?: Record<string, string>){
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        return{
            status: response.status(),
            body: await response.json()
        }
    }

    //PUT
    
     async put(endPoint: string,data: object,  headers?: Record<string, string>){
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        return{
            status: response.status(),
            body: await response.json()
        }
    }

    //delete
    
      async delete(endPoint: string,headers?: Record<string, string>){
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        return{
            status: response.status(),
            body:  response.status() === 200 || response.status() === 204 ? null : await response.json()
        }
    }

    //PATCH
    
     async patch(endPoint: string,data: object,  headers?: Record<string, string>){
        let response = await this.request.patch(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        return{
            status: response.status(),
            body: await response.json()
        }
    }

}