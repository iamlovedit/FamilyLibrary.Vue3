import type { PackageVersion } from "./PackageVersion";
export class DynamoPackage {
    name!: string;
    id!: string;
    description!: string;
    downloads!: number;
    updateTime!: string;
    createTime!: string;
    versions!: PackageVersion[];
    votes!: number;
}
