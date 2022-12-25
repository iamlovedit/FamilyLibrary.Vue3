import type { FamilyCategory } from "./FamilyCategory";
export class Family {
    id!: string;
    name!: string;
    createTime!: string;
    category!: FamilyCategory
}