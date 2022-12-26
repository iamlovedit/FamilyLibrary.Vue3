import { gobalConfig } from "./env";
import type { HttpResponse } from '../models/HttpResponse'
export class HttpRequest {
    readonly requestConfig: any = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        cache: "force-cache"
    }
    readonly baseUrl: string;
    constructor(controller: string, baseUrl: string = '') {
        if (baseUrl) {
            this.baseUrl = baseUrl + controller;
        }
        else {
            this.baseUrl = gobalConfig.baseUrl + controller;
        }
    }

    async getAsync<T>(route: string, data: any = {}): Promise<T> {
        let url = this.baseUrl + route;
        let dataStr: string = '';
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr
        }
        return await fetch(url, this.requestConfig)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<T>
            })
    }
}

// export default async (url: string = '', data: any = {}, type: string = 'GET', method: string = 'fetch') => {
//     type = type.toUpperCase();
//     url = gobalConfig.baseUrl + url;

//     if (type == 'GET') {
//         let dataStr: string = '';
//         Object.keys(data).forEach(key => {
//             dataStr += key + '=' + data[key] + '&'
//         })
//         if (dataStr !== '') {
//             dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
//             url = url + '?' + dataStr
//         }
//     }

//     if (method == 'fetch') {
//         let requestConfig: any = {
//             credentials: 'include',
//             method: type,
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             mode: "cors",
//             cache: "force-cache"
//         }

//         if (type == 'POST') {
//             Object.defineProperty(requestConfig, 'body', {
//                 value: JSON.stringify(data)
//             })
//         }

//         try {
//             const response = await fetch(url, requestConfig);
//             const responseJson = await response.json();
//             return responseJson
//         } catch (error) {
//             throw new Error(error as string)
//         }
//     }
// }