import Order from "../domain/order.entity";
import { OrderRepository } from "../domain/order.repository";

export class CancelOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute(orderId: string): Order {
    const order = this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error("Commande non trouvée");
    }

    order.cancel();
    return this.orderRepository.save(order);
  }
}
