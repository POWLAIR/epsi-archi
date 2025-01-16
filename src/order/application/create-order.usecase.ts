import Order from "../domain/order.entity";
import { OrderRepositoryInterface } from "../domain/order.repository.interface";

interface Product {
  id: number;
  price: number;
}

export interface CreateOrderRequest {
  customerId: number;
  products: Product[];
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  execute(request: CreateOrderRequest): Order {
    const newOrder = new Order(
      request.customerId.toString(),
      request.products.map((p) => p.id.toString())
    );

    newOrder.total = request.products.reduce(
      (sum, product) => sum + product.price,
      0
    );

    return this.orderRepository.save(newOrder);
  }
}
