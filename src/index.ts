import {
  Record,
  StableBTreeMap,
  Vec,
  Result,
  nat64,
  ic,
  Principal,
  $update,
  match,
  $query,
} from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define types for products, orders, and customer interactions
type FoodProduct = Record<{
  productId: string;
  name: string;
  description: string;
  category: string;
  price: nat64;
  quantityAvailable: number;
  author: Principal;
}>;

type FoodPayload = Record<{
  name: string;
  description: string;
  category: string;
  price: nat64;
  quantityAvailable: number;
}>

type UpdatePayload = Record<{
  productId: string;
  newQuantity: number;
}>


type Order = Record<{
  id: string;
  customerId: Principal;
  productId: string;
  quantity: number;
  status: string;
  createdAt: nat64;
}>;

type getOrdersByCustomer = Record<{
  customerId: string;
}>

type OrderPayload = Record<{
  productId: string;
  quantity: number;
}>

type ConfirmOrderPayload = Record<{
  orderId: string;
}>

type getProductsbyId = Record<{
  productId: string;
}>

type CustomerInteraction = Record<{
  id: string;
  customerId: Principal;
  productId: string;
  rating: number;
  review: string;
  createdAt: nat64;
}>;

type CustomerInteractionPayload = Record<{
  productId: string;
  rating: number;
  review: string;
}>

type getCustomerInteractionsByProduct = Record<{
  productId: string;
}>

// Define storage for products, orders, and customer interactions
const foodProducts = new StableBTreeMap<string, FoodProduct>(0, 44, 512)
const orders = new StableBTreeMap<string, Order>(1, 44, 512)
const customerInteractions = new StableBTreeMap<string, CustomerInteraction>(2, 44, 512)

// // set up with wallet of local user
// const owner: Principal = ic.caller();


// $query;
// export function productOwner(): string {
//     return owner.toString();
// }

// Functions for managing products
$update;
export function addProduct(
  payload: FoodPayload
): Result<FoodProduct, string> {
  const productId = uuidv4();
  const product: FoodProduct = {
    productId: productId,
    name: payload.name,
    description: payload.description,
    category: payload.category,
    price: payload.price,
    quantityAvailable: payload.quantityAvailable,
    author: ic.caller(),
  };
  foodProducts.insert(product.productId, product);
  return Result.Ok(product);
}

//function for updating products
$update;
export function updateProductQuantity(payload: UpdatePayload): Result<FoodProduct, string> {
  // Parameter Validation: Ensure that ID is provided
  if (!payload.productId) {
    return Result.Err<FoodProduct, string>('Invalid Product ID provided.');
  }

  return match(foodProducts.get(payload.productId), {
    Some: (product) => {
      // // Owner Authorization: Check if the caller is the owner
      if (product.author.toString() !== ic.caller().toString()) {
        return Result.Err<FoodProduct, string>('You are not the owner of this product');
      }

      // Update the product quantity
      const updatedProduct: FoodProduct = { ...product, quantityAvailable: payload.newQuantity };

      try {
        foodProducts.insert(product.productId, updatedProduct);
        return Result.Ok<FoodProduct, string>(updatedProduct);
      } catch (error) {
        return Result.Err<FoodProduct, string>(`Couldn't update Product with id=${payload.productId}. Product not found`);
      }
    },
    None: () => Result.Err<FoodProduct, string>(`Couldn't update Product with id=${payload.productId}. Product not found`),
  });
}

// Function to get all products by ID
$query;
export function getProductsbyId(payload: getProductsbyId): Result<FoodProduct, string> {
  // Parameter Validation: Ensure that ID is provided
  if (!payload.productId) {
    return Result.Err<FoodProduct, string>('Invalid ID provided.');
  }

  return match(foodProducts.get(payload.productId), {
    Some: (product) => Result.Ok<FoodProduct, string>(product),
    None: () => Result.Err<FoodProduct, string>(`Product with id=${payload.productId} not found`),
  });
}


// Functions for placing orders
$update;
export function placeOrder(payload: OrderPayload): Result<Order, string> {
  // Payload Validation: Ensure that required fields are present in the payload
  if (!payload.productId || !payload.quantity) {
    return Result.Err<Order, string>('Invalid payload');
  }
  return match(foodProducts.get(payload.productId  ), {
    Some: (product) => {
      // Order Authorization: Check if the caller is the owner
      const orderId = uuidv4();
      const order: Order = {
        id: orderId,
        customerId: ic.caller(),
        productId: payload.productId,
        quantity: payload.quantity,
        status: 'placed',
        createdAt: ic.time(),
      };

      // Insert the order into the orders map
      orders.insert(orderId, order);

      // Update the product quantity
      const updatedProduct: FoodProduct = { ...product, quantityAvailable: product.quantityAvailable - payload.quantity };
      foodProducts.insert(product.productId, updatedProduct);

      return Result.Ok<Order, string>(order);
    },
    None: () => Result.Err<Order, string>('Product not found'),
  })};


//function for canceling order
$update;
export function cancelOrder(payload: ConfirmOrderPayload): boolean {
  // Parameter Validation: Ensure that ID is provided
  if (!payload.orderId) {
    return false;
  }
  return match(orders.get(payload.orderId), {
    Some: (order) => {
      // Owner Authorization: Check if the caller is the owner
      if (order.customerId.toString() !== ic.caller().toString()) {
        return false;
      }
      if (order && order.status === 'placed') {
        order.status = 'cancelled';
        return true; // Order cancelled successfully
      }
      return false; // Order not found or cannot be confirmed
    },
    None: () => { return false; }
  });
}


//Function for Confirming order
$update;
export function confirmOrder(payload: ConfirmOrderPayload): boolean {
  // Parameter Validation: Ensure that ID is provided
  if (!payload.orderId) {
    return false;
  }
  return match(orders.get(payload.orderId), {
    Some: (order) => {
      // Owner Authorization: Check if the caller is the owner
      if (order.customerId.toString() !== ic.caller().toString()) {
        return false;
      }
      if (order && order.status === 'placed') {
        order.status = 'confirmed';
        return true; // Order confirmed successfully
      }
      return false; // Order not found or cannot be confirmed
    },
    None: () => { return false; }
  });
}

//Function for delivering order
$query;
export function deliverOrder(payload: ConfirmOrderPayload): boolean {
  // Parameter Validation: Ensure that ID is provided
  if (!payload.orderId) {
    return false;
  }
  return match(orders.get(payload.orderId), {
    Some: (order) => {
      // Owner Authorization: Check if the caller is the owner
      if (order.customerId.toString() !== ic.caller().toString()) {
        return false;
      }
      if (order && order.status === 'confirmed') {
        order.status = 'delivered';
        return true; // Order delivered successfully
      }
      return false; // Order not found or cannot be delivered
    },
    None: () => { return false; }
  });
}

// Functions for managing customer interactions
$update;
export function addCustomerInteraction(
  payload: CustomerInteractionPayload
): Result<CustomerInteraction, string> {
  const interactionId = uuidv4();
  const interaction: CustomerInteraction = {
    id: interactionId,
    customerId: ic.caller(),
    productId: payload.productId,
    rating: payload.rating,
    review: payload.review,
    createdAt: ic.time(),
  };
  customerInteractions.insert(interactionId, interaction)
  return Result.Ok(interaction)
}

//Function for getting Customer's interactions
$query;
export function getCustomerInteractionsByProduct(payload: getCustomerInteractionsByProduct): Result<Vec<CustomerInteraction>, string> {
  // Parameter Validation: Ensure that ID is provided
  if (!payload.productId) {
    return Result.Err<Vec<CustomerInteraction>, string>('Invalid Product ID provided.');
  }
    // Return all customer interactions for a given product
    return Result.Ok(customerInteractions.values().filter((interaction) => interaction.productId === payload.productId));
  }

  // Functions for managing customer's orders
 // Functions for managing customer's orders
$query;
export function getOrdersByCustomer(payload: getOrdersByCustomer): Result<Vec<Order>, string> {
  // Parameter Validation: Ensure that ID is provided
  if (!payload.customerId) {
    return Result.Err<Vec<Order>, string>('Invalid Customer ID provided.');
  }

  return Result.Ok(orders.values().filter((order) => order.customerId.toString() === payload.customerId));
}

// Functions for managing products
$query;
export function getProducts(): Result<Vec<FoodProduct>, string> {
  return Result.Ok(foodProducts.values());
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
