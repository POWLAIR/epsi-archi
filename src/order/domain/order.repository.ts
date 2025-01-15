import Order from "./order.entity";

export interface OrderRepository {
  save(order: Order): Order;
  findById(id: string): Order | undefined;
}
