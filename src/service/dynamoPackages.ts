import { HttpRequest } from "@/config/fetch";
import type { PageModel } from "@/models/PageModel";
import type { DynamoPackage } from "@/models/DynamoPackage";
import type { HttpResponse } from '@/models/HttpResponse';
import type { PackageVersion } from "@/models/PackageVersion";

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
function getPackageVersionsFetch(id: string, pageIndex: number = 1, pageSize: number = 20) {
    let data = {
        pageIndex,
        pageSize
    }
    const promise = httpRequest.getAsync<HttpResponse<PageModel<PackageVersion>>>(`/v1/${id}`, data);
    return promise;
}


export {
    getPackagesPageFetch,
    getPackageVersionsFetch
}
