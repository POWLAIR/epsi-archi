import { Container } from "../../shared/container";
import { OrderRepository } from "../domain/order.repository";
import { MemoryOrderRepository } from "./memory-order.repository";

export function initializeOrderContainer(): void {
  Container.register<OrderRepository>(
    "OrderRepository",
    new MemoryOrderRepository()
  );
}
