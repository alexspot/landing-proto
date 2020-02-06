import { Color } from '../shared/models/color.model';

export class Product {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public image: string,
    public colors: Color[]) {}
}