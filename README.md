# FoodChop

## Overview

FoodChop, a comprehensive solution for managing food products, orders, and customer interactions. This system is designed to streamline the process of handling food-related transactions and interactions in a seamless and efficient manner.
With FoodChop, you can easily manage your product catalog, track orders in real-time, and engage with your customers to enhance their experience. Whether you're a small-scale food vendor or a large restaurant chain, FoodChop is designed to scale with your business and adapt to your needs.

## Prerequisites

- Node
- Typescript
- DFX

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Dolazdev/FoodChop.git
    cd FoodChop
    nvm install 18
    nvm use 18
    npm install
    ```
2. **INSTALL DFX**

    ```bash
    DFX_VERSION=0.14.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
    ```
3. **Add DFX to your path**
   
    ```bash
    echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
    ```

## Usage

Here are the main functionalities provided by this system:

### Managing Products

- `addProduct(payload: FoodPayload): Result<FoodProduct, string>`
  - Adds a new food product to the system.
- `updateProductQuantity(productId: string, newQuantity: number): Result<FoodProduct, string>`
  - Updates the quantity of a food product.
- `getProductsbyId(): Result<Vec<FoodProduct>, string>`
  - Retrieves all food products.

### Managing Orders

- `placeOrder(payload: OrderPayload): Result<Order, string>`
  - Places a new order.
- `cancelOrder(orderId: string): boolean`
  - Cancels an order.
- `confirmOrder(orderId: string): boolean`
  - Confirms an order.
- `deliverOrder(orderId: string): boolean`
  - Marks an order as delivered.
- `getOrdersByCustomer(customerId: string): Result<Vec<Order>, string>`
  - Retrieves orders for a specific customer.

### Managing Customer Interactions

- `addCustomerInteraction(payload: CustomerInteractionPayload): Result<CustomerInteraction, string>`
  - Adds a customer interaction.
- `getCustomerInteractionsByProduct(productId: string): Result<Vec<CustomerInteraction>, string>`
  - Retrieves customer interactions for a specific product.

## Data Storage

The system uses `StableBTreeMap` to store products, orders, and customer interactions. Each data type is stored in its respective map:

- `foodProducts: StableBTreeMap<string, FoodProduct>`
- `orders: StableBTreeMap<string, Order>`
- `customerInteractions: StableBTreeMap<string, CustomerInteraction>`


## Testing Instructions 

- Make sure you have the required environment for running ICP canisters and the dfx is running in background `dfx start --background --clean`
- Deploy the canisters `dfx deploy`

<pre>
Deploying all canisters.
Creating a wallet canister on the local network.
The wallet canister on the "local" network for user "default" is "bnz7o-iuaaa-aaaaa-qaaaa-cai"
Creating canisters...
Creating canister foodchop...
foodchop canister created with canister id: bkyz2-fmaaa-aaaaa-qaaaq-cai
Building canisters...
Executing 'npx azle foodchop'
</pre>

<pre>
Installing canisters...
Creating UI canister on the local network.
The UI canister on the "local" network is "bd3sg-teaaa-aaaaa-qaaba-cai"
Installing code for canister foodchop, with canister ID bkyz2-fmaaa-aaaaa-qaaaq-cai
Deployed canisters.
URLs:
  Backend canister via Candid interface:
    foodchop: http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
</pre>
- Click on the link to the supremall canister, once the UI has been loaded.
- You can now call the `addProduct` function to add products to the system and also carry out other operations like `updateProductQuantity`, `placeOrder`, `confirmOrder` and `addCustomerInteraction` products.

To conclude your work session, you can stop your local Azle replica by executing the following command in your terminal:
  ```bash
   dfx stop
  ```

### Mainnet Testing
- Navigate to this link [FoodChop](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=uf3pk-yyaaa-aaaap-abutq-cai)
- Login with your Identity
- Proceed to perform operations on the carnister e.g `addProduct`, `placeOrder`, `addCustomerInteraction` etc...

## License

This project is licensed under the MIT License 

## Ibisomi Teslim - Backend and Blockchain developer
