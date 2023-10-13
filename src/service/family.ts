import { HttpRequest } from "@/config/fetch";
import type { HttpResponse } from "@/models/HttpResponse";
import type { FamilyCategory } from "@/models/FamilyCategory";
import type { Family } from "@/models/Family";
import type { PageModel } from "@/models/PageModel";
const httpRequest = new HttpRequest('family');

function getFamilyCategoriesFetch(): Promise<HttpResponse<FamilyCategory[]>> {
    const promise = httpRequest.getAsync<HttpResponse<FamilyCategory[]>>('/v1/categories');
    return promise;
}
function getFamilyPageByCategoryFetch(categoryId: number, pageIndex: number, pageSize: number): Promise<HttpResponse<PageModel<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageModel<Family>>>("/v1/category", {
        categoryId,
        pageIndex,
        pageSize
    })
    return promise;
}
function getFamilyPageByKeywordFetch(keyword: string, pageIndex: number, pageSize: number): Promise<HttpResponse<PageModel<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageModel<Family>>>('/v1/keyword', {
        keyword,
        pageIndex,
        pageSize
    })
    return promise;
}

function getFamilyPageFetech(pageIndex: number, pageSize: number): Promise<HttpResponse<PageModel<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageModel<Family>>>('/v1/all', {
        pageIndex,
        pageSize
    })
    return promise;
}

function filterFamiliePageFetch(categoryId: number, keyword: string, pageIndex: number, pageSize: number): Promise<HttpResponse<PageModel<Family>>> {
    const promise = httpRequest.getAsync<HttpResponse<PageModel<Family>>>('/v1', {
        categoryId,
        keyword,
        pageIndex,
        pageSize
    })
    return promise

}

function getFamilyFileByVersionFetch(id: number, version: number) {
    //TODO:
    let route = `/v1/${id}/${version}`;
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
    getFamilyCategoriesFetch,
    getFamilyPageFetech,
    getFamilyPageByCategoryFetch,
    getFamilyPageByKeywordFetch,
    getFamilyFileByVersionFetch,
    getFamilyDetailFetch,
    getFamilyVersionFetch,
    filterFamiliePageFetch
}
