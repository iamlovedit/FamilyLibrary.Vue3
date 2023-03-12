import { HttpRequest } from "@/config/fetch";
import type { HttpResponse } from "@/models/HttpResponse";
import type { FamilyCategory } from "@/models/FamilyCategory";
import type { Family } from "@/models/Family";
import type { PageModel } from "@/models/PageModel";
const httpRequest = new HttpRequest('family');

function getfamilyCategoriesFetch(): Promise<HttpResponse<FamilyCategory[]>> {
    const promise = httpRequest.getAsync<HttpResponse<FamilyCategory[]>>('/v1/categories');
    return promise;
}
function getFamilyPageByCategoryFetch(categoryId: number, pageIndex: number, pageSize: number): Promise<HttpResponse<PageModel<Family>>> {
    const route = `byCategory`;
    const promise = httpRequest.getAsync<HttpResponse<PageModel<Family>>>(route, {
        categoryId,
        pageIndex,
        pageSize
    })
    return promise;
}
function getFamilyPageByKeywordFetch(keyword: string, pageIndex: number, pageSize: number): Promise<HttpResponse<PageModel<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageModel<Family>>>('', {
        keyword,
        pageIndex,
        pageSize
    })
    return promise;
}

function getFamilyFileByVersionFetch(id: number, version: number) {
    //TODO:
}

function getFamilyDetailFetch(id: number): Promise<HttpResponse<Family>> {
    const route = `/v1/${id}`
    const promise = httpRequest.getAsync<HttpResponse<Family>>(route);
    return promise;
}
function getFamilyVersionFetch(id: number): Promise<HttpResponse<number[]>> {
    const route = `/v1/versions/${id}`
    const promise = httpRequest.getAsync<HttpResponse<number[]>>(route);
    return promise;
}


export {
    getfamilyCategoriesFetch,
    getFamilyPageByCategoryFetch,
    getFamilyPageByKeywordFetch,
    getFamilyFileByVersionFetch,
    getFamilyDetailFetch,
    getFamilyVersionFetch
}
