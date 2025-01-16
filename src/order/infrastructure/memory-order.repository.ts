import Order from "../domain/order.entity";
import { OrderRepositoryInterface } from "../domain/order.repository.interface";

export class MemoryOrderRepository implements OrderRepositoryInterface {
  private orders: Map<string, Order> = new Map();
  private currentId: number = 1;

  save(order: Order): Order {
    if (!order.id) {
      order.id = this.currentId.toString();
      this.currentId++;
    }
    this.orders.set(order.id, order);
    return order;
  }

  findById(id: string): Order | undefined {
    return this.orders.get(id);
  }

  findAll(): Order[] {
    return Array.from(this.orders.values());
  }
}
