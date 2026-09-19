import { Category } from './category.model';
import { Product } from './product.model';

export interface ProductsResponse {
    categories: Category[];
    products: Product[];
}
