import { Product } from '../products/product.model';
import { Color } from '../shared/models/color.model';

export class Order {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public city: string,
    public npAffiliate: string,
    public status: string,
    public product: Product,
    public productColor: Color,
    public createTime: string
  ) {}
}