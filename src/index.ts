import {
  Record,
  StableBTreeMap,
  Vec,
  Result,
  nat64,
  ic,
  Opt,
  Principal,
} from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define types for products, orders, and customer interactions
type FoodProduct = {
  id: string;
  name: string;
  description: string;
  price: nat64;
  quantityAvailable: number;
  imageUrl: string;
};

type Order = {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
  status: 'placed' | 'confirmed' | 'cancelled' | 'delivered';
  createdAt: nat64;
};

type CustomerInteraction = {
  id: string;
  customerId: string;
  productId: string;
  rating: number;
  review: string;
  createdAt: nat64;
};

// Define storage for products, orders, and customer interactions
const foodProducts: Record<string, FoodProduct> = {};
const orders: Record<string, Order> = {};
const customerInteractions: Record<string, CustomerInteraction> = {};

// Functions for managing products
export function addProduct(
  name: string,
  description: string,
  price: nat64,
  quantityAvailable: number,
  imageUrl: string
): FoodProduct {
  const productId = uuidv4();
  const product: FoodProduct = {
    id: productId,
    name,
    description,
    price,
    quantityAvailable,
    imageUrl,
  };
  foodProducts[productId] = product;
  return product;
}

export function updateProductQuantity(productId: string, newQuantity: number): boolean {
  const product = foodProducts[productId];
  if (product) {
    product.quantityAvailable = newQuantity;
    return true; // Product quantity updated successfully
  }
  return false; // Product not found
}

export function getProductById(productId: string): FoodProduct | undefined {
  return foodProducts[productId];
}

// Functions for managing orders
export function placeOrder(
  customerId: string,
  productId: string,
  quantity: number
): Order {
  const orderId = uuidv4();
  const order: Order = {
    id: orderId,
    customerId,
    productId,
    quantity,
    status: 'placed',
    createdAt: ic.time(),
  };
  orders[orderId] = order;
  return order;
}

export function cancelOrder(orderId: string): boolean {
  const order = orders[orderId];
  if (order && order.status === 'placed') {
    order.status = 'cancelled';
    return true; // Order cancelled successfully
  }
  return false; // Order not found or cannot be cancelled
}

export function confirmOrder(orderId: string): boolean {
  const order = orders[orderId];
  if (order && order.status === 'placed') {
    order.status = 'confirmed';
    return true; // Order confirmed successfully
  }
  return false; // Order not found or cannot be confirmed
}

export function deliverOrder(orderId: string): boolean {
  const order = orders[orderId];
  if (order && order.status === 'confirmed') {
    order.status = 'delivered';
    return true; // Order delivered successfully
  }
  return false; // Order not found or cannot be delivered
}

// Functions for managing customer interactions
export function addCustomerInteraction(
  customerId: string,
  productId: string,
  rating: number,
  review: string
): CustomerInteraction {
  const interactionId = uuidv4();
  const interaction: CustomerInteraction = {
    id: interactionId,
    customerId,
    productId,
    rating,
    review,
    createdAt: ic.time(),
  };
  customerInteractions[interactionId] = interaction;
  return interaction;
}

export function getCustomerInteractionsByProduct(productId: string): CustomerInteraction[] {
  // Return all customer interactions for a given product
  return Object.values(customerInteractions).filter(
    (interaction) => interaction.productId === productId
  );
}

// Functions for managing orders
export function getOrdersByCustomer(customerId: string): Order[] {
  return Object.values(orders).filter((order) => order.customerId === customerId);
}

// Functions for managing products
export function getProducts(): FoodProduct[] {
  return Object.values(foodProducts);
}

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};
