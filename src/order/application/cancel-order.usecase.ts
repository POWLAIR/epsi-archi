import Order from "../domain/order.entity";
import { OrderRepositoryInterface } from "../domain/order.repository.interface";

export class CancelOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  execute(orderId: string): Order {
    const order = this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error("Commande non trouvée");
    }

    order.cancel();
    return this.orderRepository.save(order);
  }
}
