import { HttpRequest } from "@/config/fetch";
import type { HttpResponse } from "@/models/HttpResponse";
import type { FamilyCategory } from "@/models/FamilyCategory";
import type { Family } from "@/models/Family";
import type{ PageModel } from "@/models/PageModel";
const httpRequest = new HttpRequest('family');

function getfamilyCategoriesFetch(): Promise<HttpResponse<FamilyCategory[]>> {
    const promise = httpRequest.getAsync<HttpResponse<FamilyCategory[]>>('categories');
    return promise;
}
function getFamilyPageByCategoryFetch(categoryId:number,pageIndex:number,pageSize:number):Promise<HttpResponse<PageModel<Family>>> {
    const route=`byCategory`;
    const promise=httpRequest.getAsync<HttpResponse<PageModel<Family>>>(route,{
        categoryId,
        pageIndex,
        pageSize
    })
    return promise;
}


export{
    getfamilyCategoriesFetch,
    getFamilyPageByCategoryFetch
}
