import { HttpRequest } from "@/config/fetch";
import type { PageModel } from "../models/PageModel";
import type { DynamoPackage } from "@/models/DynamoPackage";
import type { HttpResponse } from '@/models/HttpResponse';

const httpRequest = new HttpRequest('packages')
function getPackagesPageFetch(keyword: string | undefined, pageIndex: number = 1, pageSize: number = 30, orderField?: string) {
    const route: string = keyword ? `?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}&orderField=${orderField}` :
        `?pageIndex=${pageIndex}&pageSize=${pageSize}&orderField=${orderField}`;
    const promise = httpRequest.getAsync<HttpResponse<PageModel<DynamoPackage>>>(route);
    return promise;
}
export {
    getPackagesPageFetch
}
