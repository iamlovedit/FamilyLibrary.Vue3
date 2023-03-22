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
function getPackageDetailFetch(id: string, pageIndex: number = 1, pageSize: number = 20) {
    const route: string = `/v1/${id}`
    let data = {
        pageIndex,
        pageSize
    }
    const promise = httpRequest.getAsync<HttpResponse<DynamoPackage>>(route, data);
    return promise;
}

export {
    getPackagesPageFetch,
    getPackageDetailFetch
}
