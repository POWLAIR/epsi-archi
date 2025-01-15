class Order {
  public id: string;
  public createdAt: Date;
  public paidAt?: Date;
  public canceledAt?: Date;
  public total: number;
  public customer: string;
  public products: string[];
  public status: "PENDING" | "CONFIRMED" | "CANCELLED";

  constructor(customerId: string, products: string[]) {
    // Vérification des règles métier
    if (!customerId) {
      throw new Error("L'ID du client est obligatoire");
    }

    if (products.length === 0) {
      throw new Error("La commande doit contenir au moins un produit");
    }

    if (products.length > 2) {
      throw new Error("La commande ne peut pas contenir plus de deux produits");
    }

    // Initialisation des propriétés
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
    this.customer = customerId;
    this.products = products;
    this.status = "PENDING";
    this.total = 0;
  }

  pay(): void {
    // Vérification des règles métier
    if (this.status !== "PENDING") {
      throw new Error(
        "La commande ne peut pas être payée car son statut est " + this.status
      );
    }

    if (this.total === 0) {
      throw new Error(
        "La commande ne peut pas être payée car son montant est de 0"
      );
    }

    if (this.products.length === 0) {
      throw new Error(
        "La commande ne peut pas être payée car elle ne contient aucun produit"
      );
    }

    // Mise à jour du statut et de la date de paiement
    this.status = "CONFIRMED";
    this.paidAt = new Date();
  }

  cancel(): void {
    if (this.status === "CANCELLED") {
      throw new Error("La commande a déjà été annulée");
    }

    if (this.status !== "CONFIRMED") {
      throw new Error(
        "La commande ne peut être annulée que si elle a été payée"
      );
    }

    this.status = "CANCELLED";
    this.canceledAt = new Date();
  }
}

export default Order;
