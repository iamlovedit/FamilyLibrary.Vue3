export class PageModel<T> {
    page!: number;
    pageCount!: number;
    pageSize!: number;
    data!: T[];
    dataCount!: number;
}