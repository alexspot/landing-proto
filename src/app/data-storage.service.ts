export class DataStorageService {
  orderList = [];

  addOrderToList(order) {
    this.orderList.push(order);
  }
}