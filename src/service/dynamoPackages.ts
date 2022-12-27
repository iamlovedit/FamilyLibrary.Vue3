import { HttpRequest } from "@/config/fetch";
import type { PageModel } from "@/models/PageModel";
import type { DynamoPackage } from "@/models/DynamoPackage";
import type { HttpResponse } from '@/models/HttpResponse';

const httpRequest = new HttpRequest('packages')
function getPackagesPageFetch(keyword: string = '', pageIndex: number = 1, pageSize: number = 30, orderField?: string) {
    const promise = httpRequest.getAsync<HttpResponse<PageModel<DynamoPackage>>>('',{
        keyword,
        pageIndex,
        pageSize,
        orderField
    });
    return promise;
}
function getPackageDetailFetch(id: string) {
    const route: string = `/${id}`
    const promise = httpRequest.getAsync<HttpResponse<DynamoPackage>>(route);
    return promise;
}

export {
    getPackagesPageFetch,
    getPackageDetailFetch
}
