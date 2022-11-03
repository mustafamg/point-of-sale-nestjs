import { Product } from "../product"

export class PaginatedProductsResultDto {
  data: Product[]
  pageIndex: number
  pageSize: number
  total: number
}
