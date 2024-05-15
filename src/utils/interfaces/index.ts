export interface Product {
    id?: number;
    handle: string;
    title: string;
    description: string;
    sku: string;
    grams: number;
    stock: number;
    price: number;
    comparePrice?: number | null;
    barcode?: string | null;
}

export interface PaginationMetaDtoParameters {
    itemCount: number;
    page: number;
    take: number;
}

export interface PaginationMetaDto extends PaginationMetaDtoParameters {
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface PaginationDto<T> {
    data: T[];
    meta: PaginationMetaDto;
  }
  