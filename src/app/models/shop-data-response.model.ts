import { Category } from './category.model';
import { Product } from './product.model';

export interface ShopDataResponse {
    categories: Category[];
    products: Product[];
}
