# EPSI Architecture Project

Ce projet est une API REST construite avec Express.js et TypeScript, suivant les principes de Clean Architecture.

## Prérequis

- Node.js
- npm

## Installation

1. Clonez le repository

```
git clone <repository-url>
cd epsi-archi
```

2. Installez les dépendances

```
npm install
```

## Structure du Projet

```
src/
├── index.ts                # Point d'entrée de l'application
├── product/
│   └── product.controller.ts
└── order/                  # Module Order suivant Clean Architecture
    ├── domain/            # Règles métier et interfaces
    │   ├── order.entity.ts
    │   └── order.repository.ts
    ├── application/       # Cas d'utilisation
    │   ├── create-order.usecase.ts
    │   └── pay-order.usecase.ts
    ├── infrastructure/    # Implémentations techniques
    │   └── memory-order.repository.ts
    └── presentation/      # Controllers HTTP
        └── order.controller.ts
```

### Description des Fichiers

#### Domain Layer

- `order.entity.ts` : Définit la classe Order avec ses propriétés et règles métier
- `order.repository.ts` : Interface définissant les méthodes de persistence

#### Application Layer

- `create-order.usecase.ts` : Gère la logique de création d'une commande
- `pay-order.usecase.ts` : Gère la logique de paiement d'une commande
- `cancel-order.usecase.ts` : Gère la logique d'annulation d'une commande

#### Infrastructure Layer

- `memory-order.repository.ts` : Implémentation en mémoire du repository
- `container.ts` : Configuration du container de dépendances pour Order

#### Presentation Layer

- `order.controller.ts` : Routes HTTP et transformation des requêtes/réponses

#### Shared

- `container.ts` : Implémentation générique du container de dépendances

### Flux de Données

1. Le client envoie une requête HTTP
2. Le controller reçoit la requête et la transforme en DTO
3. Le use case traite la demande en utilisant les entités du domaine
4. Le repository gère la persistence des données
5. La réponse remonte la chaîne jusqu'au client

### Responsabilités

- **Domain** : Règles métier et structure des données
- **Application** : Orchestration des cas d'utilisation
- **Infrastructure** : Détails techniques et persistence
- **Presentation** : Interface avec le monde extérieur

## Scripts Disponibles

- Build du projet :

```
npm run build
```

- Démarrer en mode développement (avec hot reload) :

```
npm run dev
```

- Démarrer en mode production :

```
npm start
```

## Endpoints API

- GET `/api/hello` - Message de test
- GET `/api/products` - Liste des produits
- POST `/api/orders` - Création d'une commande
- POST `/api/orders/:orderId/pay` - Paiement d'une commande
- POST `/api/orders/:orderId/cancel` - Annulation d'une commande

### Exemple de Création de Commande

```json
POST /api/orders
{
    "customerId": 2,
    "products": [
        {
            "id": 1,
            "price": 3
        },
        {
            "id": 2,
            "price": 3
        }
    ]
}
```

## Règles Métier

### Commandes (Order)

#### Création

- Une commande doit avoir un ID client
- Une commande doit contenir entre 1 et 2 produits

#### Paiement

- Une commande ne peut pas être payée si elle est déjà payée ou annulée
- Une commande ne peut pas être payée si le montant total est de 0
- Une commande ne peut pas être payée si la liste de produits est vide

#### Annulation

- Une commande ne peut être annulée que si elle a été payée
- Une commande déjà annulée ne peut pas être re-annulée

## Architecture

Le projet suit les principes de Clean Architecture avec une séparation en couches :

- **Domain** : Contient les entités et règles métier
- **Application** : Contient les cas d'utilisation
- **Infrastructure** : Contient les implémentations techniques
- **Presentation** : Contient les contrôleurs HTTP

### Inversion de Dépendance

Le projet utilise le principe d'inversion de dépendance (DIP) :

```typescript
// Interface dans le domaine
interface OrderRepositoryInterface {
  save(order: Order): Order;
  findById(id: string): Order | undefined;
  findAll(): Order[];
}

// Use case dépend de l'interface
class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}
}

// Implémentation concrète dans l'infrastructure
class MemoryOrderRepository implements OrderRepositoryInterface {
  // ...
}
```

Les avantages :

- Découplage entre les use cases et l'implémentation du repository
- Facilité pour changer l'implémentation (ex: passer d'une base mémoire à MongoDB)
- Meilleure testabilité avec possibilité de mock

## Injection de Dépendances

Le projet utilise un container de dépendances simple pour gérer les singletons :

```typescript
// Enregistrement d'un service
Container.getInstance().register<OrderRepository>(
  "OrderRepository",
  new MemoryOrderRepository()
);

// Récupération d'un service
const repository =
  Container.getInstance().get<OrderRepository>("OrderRepository");
```

### Structure

```
src/
├── shared/
│   └── container.ts         # Container de dépendances générique
└── order/
    └── infrastructure/
        └── container.ts     # Initialisation des dépendances Order
```

Le container assure qu'une seule instance de chaque service est créée et partagée dans l'application.

## Configuration

### TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Nodemon (pour le développement)

Le serveur redémarre automatiquement lors des modifications de fichiers.

## Dépendances Principales

- express : Framework web
- typescript : Support du langage TypeScript
- nodemon : Rechargement automatique en développement
- concurrently : Exécution parallèle des commandes

## Persistence

Actuellement, les données sont stockées en mémoire via `MemoryOrderRepository`. Dans un environnement de production, il faudrait remplacer cette implémentation par une vraie base de données.

## Fichiers Ignorés (.gitignore)

```
node_modules/
dist/
```
