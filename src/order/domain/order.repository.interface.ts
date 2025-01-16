import Order from "./order.entity";

export interface OrderRepositoryInterface {
  save(order: Order): Order;
  findById(id: string): Order | undefined;
  findAll(): Order[];
}
