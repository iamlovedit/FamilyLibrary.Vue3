import { HttpRequest } from "@/config/fetch";
import type { PageModel } from "@/models/PageModel";
import type { DynamoPackage } from "@/models/DynamoPackage";
import type { HttpResponse } from '@/models/HttpResponse';

const httpRequest = new HttpRequest('package')
function getPackagesPageFetch(keyword?: string, pageIndex: number = 1, pageSize: number = 30, orderField?: string) {
    let data = keyword ? {
        keyword,
        pageIndex,
        pageSize,
        orderField
    } : {
        pageIndex,
        pageSize,
        orderField
    };
    const promise = httpRequest.getAsync<HttpResponse<PageModel<DynamoPackage>>>('/v1/packages', data);
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
