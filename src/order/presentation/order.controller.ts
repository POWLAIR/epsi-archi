import express from "express";
import {
  CreateOrderUseCase,
  CreateOrderRequest,
} from "../application/create-order.usecase";
import { PayOrderUseCase } from "../application/pay-order.usecase";
import { Container } from "../../shared/container";
import { OrderRepository } from "../domain/order.repository";
import { initializeOrderContainer } from "../infrastructure/container";
import { CancelOrderUseCase } from "../application/cancel-order.usecase";

// Initialisation du container
initializeOrderContainer();

const router = express.Router();
const orderRepository = Container.get<OrderRepository>("OrderRepository");
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const payOrderUseCase = new PayOrderUseCase(orderRepository);
const cancelOrderUseCase = new CancelOrderUseCase(orderRepository);

router.post("/api/orders", (req, res) => {
  try {
    const request = req.body as CreateOrderRequest;
    const newOrder = createOrderUseCase.execute(request);

    res.status(201).json({
      message: "Commande créée avec succès",
      order: newOrder,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Une erreur inconnue est survenue" });
    }
  }
});

router.post("/api/orders/:orderId/pay", (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = payOrderUseCase.execute(orderId);

    res.json({
      message: "Commande payée avec succès",
      order: updatedOrder,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Une erreur inconnue est survenue" });
    }
  }
});

router.post("/api/orders/:orderId/cancel", (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = cancelOrderUseCase.execute(orderId);

    res.json({
      message: "Commande annulée avec succès",
      order: updatedOrder,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Une erreur inconnue est survenue" });
    }
  }
});

export default router;
