import { Container } from "../../shared/container";
import { OrderRepositoryInterface } from "../domain/order.repository.interface";
import { MemoryOrderRepository } from "./memory-order.repository";

export function initializeOrderContainer(): void {
  Container.register<OrderRepositoryInterface>(
    "OrderRepository",
    new MemoryOrderRepository()
  );
}
