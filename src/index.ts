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
    id: string;
    name: string;
    description: string;
    price: nat64;
    quantityAvailable: number;
  }>;

  type FoodPayload = Record<{
    name: string;
    description: string;
    price: nat64;
    quantityAvailable: number;
}>
  
  
  type Order = Record<{
    id: string;
    customerId: Principal;
    productId: string;
    quantity: number;
    status: string;
    createdAt: nat64;
  }>;

  type OrderPayload = Record<{
    productId: string;
    quantity: number;
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
  
  // Define storage for products, orders, and customer interactions
  const foodProducts = new StableBTreeMap<string, FoodProduct>(0, 44, 512)
  const orders =  new StableBTreeMap<string, Order>(1, 44, 512)
  const customerInteractions = new StableBTreeMap<string, CustomerInteraction>(2, 44, 512)
  
  // set up with wallet of local user 
  const owner: Principal = ic.caller();

  
  // Query
  //function to get all products by ID
  $query;
  export function getProductsbyId(id: string): Result<FoodProduct, string> {
    return match(foodProducts.get(id), {
      Some: (product) => Result.Ok<FoodProduct, string>(product),
      None: () => Result.Err<FoodProduct, string>(`Product with id=${id} not found`)
  });
  }

    //Function for getting Customer's interactions
    $query;
    export function getCustomerInteractionsByProduct(productId: string): Result<Vec<CustomerInteraction>, string>{
      // Return all customer interactions for a given product
      return Result.Ok(customerInteractions.values().filter((interaction) => interaction.productId === productId));
    }
  
    // Functions for managing customer's orders
    $query;
    export function getOrdersByCustomer(customerId: string): Result<Vec<Order>, string> {
      // return Object.values(orders).filter((order) => order.customerId === customerId);
      return Result.Ok(orders.values().filter((order) => order.customerId.toString() === customerId));
    }
    
    // Functions for managing products
    $query;
    export function getProducts(): Result<Vec<FoodProduct>, string> {
      return Result.Ok(foodProducts.values());
    }


  // Update functions
  // Functions for managing products
  $update;
  export function addProduct(
    payload: FoodPayload
  ): Result<FoodProduct, string> {
    const productId = uuidv4();
    const product: FoodProduct = {
      id: productId,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      quantityAvailable : payload.quantityAvailable,
    };
    foodProducts.insert(product.id, product);
    return Result.Ok(product);
  }
  
  $update;
  export function updateProductQuantity(productId: string, newQuantity: number): Result<FoodProduct, string>{
    return match(foodProducts.get(productId), {
      Some: (product) => {
          if (owner.toString() !== ic.caller().toString()) {
              return Result.Err<FoodProduct, string>("You are not the owner of this product");
            }
          const updatedProduct: FoodProduct = {...product, quantityAvailable: newQuantity};
          foodProducts.insert(product.id, updatedProduct);
          return Result.Ok<FoodProduct, string>(updatedProduct);
      },
      None: () => Result.Err<FoodProduct, string>(`Couldn't update Product with id=${productId}. Product not found`)
  });
  }
  
  
  // Functions for placing orders
  $update;
  export function placeOrder(
    payload : OrderPayload
  ): Result<Order, string>{
    return match(foodProducts.get(payload.productId), {
      Some: (product) => {
        const orderId = uuidv4();
        const order: Order = {
          id: orderId,
          customerId : ic.caller(),
          productId: payload.productId,
          quantity: payload.quantity,
          status: 'placed',
          createdAt: ic.time(),
        };
        orders.insert(orderId, order)
        const updatedProduct: FoodProduct = {...product, quantityAvailable: product.quantityAvailable - payload.quantity};
        foodProducts.insert(product.id, updatedProduct);
        return Result.Ok<Order, string>(order);
      },
      None: () => Result.Err<Order, string>(`Product not found`)
  });
  }
  
  
  //function for canceling order
  $update;
  export function cancelOrder(orderId: string): boolean {
    return match(orders.get(orderId), {
      Some: (order) => {
        if (order.customerId.toString() !== ic.caller().toString()) {
          return false;
        }
        if (order && order.status === 'placed') {
          order.status = 'cancelled';
          return true; // Order cancelled successfully
        }
          return false; // Order not found or cannot be confirmed
      },
      None: () => {return false;}
  });
  }
  
  //Function for Confirming order
  $update;
  export function confirmOrder(orderId: string): boolean {
    return match(orders.get(orderId), {
      Some: (order) => {
        if (order && order.status === 'placed') {
          order.status = 'confirmed';
          return true; // Order confirmed successfully
        }
          return false; // Order not found or cannot be confirmed
      },
      None: () => {return false;}
  });
  }
  
  //Function for delivering order
  $update;
  export function deliverOrder(orderId: string): boolean {
    return match(orders.get(orderId), {
      Some: (order) => {
        if (owner.toString() !== ic.caller().toString()) {
          return false;
        }
        if (order && order.status === 'confirmed') {
          order.status = 'delivered';
          return true; // Order delivered successfully
        }
        return false; // Order not found or cannot be delivered
      },
    None: () => {return false;}
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
