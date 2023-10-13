export class FamilyCategory {
    id!: number;
    code!: string;
    name!: string;
    children!: FamilyCategory[];
    parent!: FamilyCategory;
}