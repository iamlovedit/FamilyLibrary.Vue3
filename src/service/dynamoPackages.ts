import { HttpRequest } from "@/config/fetch";
import type { PageModel } from "@/models/PageModel";
import type { DynamoPackage } from "@/models/DynamoPackage";
import type { HttpResponse } from '@/models/HttpResponse';
import type { PackageVersion } from "@/models/PackageVersion";

interface OrderOption {
    value: string,
    label: string
}
const orderOptions: OrderOption[] = [
    {
        value: 'downloads',
        label: '下载量'
    },
    {
        value: 'name',
        label: '名称'
    },
    {
        value: 'votes',
        label: '点赞量'
    },
    {
        value: 'updateTime',
        label: '更新时间'
    },
    {
        value: 'createTime',
        label: '创建时间'
    },
]

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
    getPackageVersionsFetch,
    orderOptions
};
export type { OrderOption };

