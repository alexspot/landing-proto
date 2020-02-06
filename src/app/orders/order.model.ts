import { Product } from '../products/product.model';

export class Order {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public city: string,
    public npAffiliate: string,
    public status: string,
    public product: Product,
    public productColor: string,
    public createTime: string
  ) {}
}