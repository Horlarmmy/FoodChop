import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Error "mo:base/Error";
import ICRaw "mo:base/ExperimentalInternetComputer";
import List "mo:base/List";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Types "./Types";

actor FoodApp {

  var userProfiles = Map.HashMap<Principal, Types.UserProfile>(1, Principal.equal, Principal.hash);
  var customerInteractions = Map.HashMap<Text, Types.CustomerInteraction>(1, Text.equal, Text.hash);
  var orders = Map.HashMap<Nat, Types.Order>(1, Nat.equal, Hash.hash);
  var foodProducts = Map.HashMap<Text, Types.FoodProduct>(1, Text.equal, Text.hash);

  // Functions ✅
  public shared (message) func addProduct(productId : Text, payload : Types.FoodProductPayload) {
    let product : Types.FoodProduct = {
      productId = productId;
      name = payload.name;
      description = payload.description;
      price = payload.price;
      quantityAvailable = payload.quantityAvailable;
      category = payload.category;
      reviews = List.nil();
      author = message.caller;
    };
    foodProducts.put(productId, product);
  };

  // Functions ✅
  public shared (message) func createUserProfile(payload : Types.UserProfilePayload) {
    let account = message.caller;
    let profile : Types.UserProfile = {
      name = payload.name;
      address = payload.address;
      phone = payload.phone;
      account = message.caller;
      image = payload.image;
    };
    userProfiles.put(account, profile);
  };

  // Functions ✅
  public shared (message) func placeOrder(payload : Types.OrderPayload): async Types.Result<(), Text> {
    // validates if the product exists
    let product = foodProducts.get(payload.productId);
    if (product == null) {
      return #err "Product does not exist";
    };

    let orderId = orders.size();
    let order : Types.Order = {
      id = orderId;
      customerId = message.caller;
      productId = payload.productId;
      quantity = payload.quantity;
      status = #placed;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    orders.put(orderId, order);

    // update the product quantity
    let updatedProduct : Types.FoodProduct = switch (product) {
      case (?prod) {
        {
          productId = prod.productId;
          name = prod.name;
          description = prod.description;
          price = prod.price;
          quantityAvailable = prod.quantityAvailable - payload.quantity;
          reviews = prod.reviews;
          category = prod.category;
          author = prod.author;
        };
      };
      case (null) { return #err "Invalid product"};
    };
    foodProducts.put(payload.productId, updatedProduct);

    return #ok;

  };

  // Functions ✅
  public shared (message) func cancelOrder(orderId : Nat) : async Types.Result<(), Text> {
    let order = orders.get(orderId);
    if (order == null) {
      return #err "Invalid order";
    };
    //confirm if the caller is the customer
    switch (order) {
      case (?orderValue) {
        if (orderValue.customerId != message.caller) {
          return #err "User not authorized";
        };
        // check if order status is placed
        if (orderValue.status != #placed) {
          return #err "Order cannot be cancelled";
        };
        //update the order status
        let updatedOrder : Types.Order = {
          id = orderId;
          customerId = orderValue.customerId;
          productId = orderValue.productId;
          quantity = orderValue.quantity;
          status = #cancelled;
          createdAt = orderValue.createdAt;
          updatedAt = Time.now();
        };

        orders.put(orderId, updatedOrder);
        return #ok;
      };
      case (null) { return #err "Invalid order" };
    };
  };

  // // Functions ✅
  // public shared (message) func 

  // Function to add a customer interaction
  public func addReview(payload : Types.CustomerInteractionPayload) {
    let id = Nat.toText(customerInteractions.size());
  };

  // public func addCustomerInteraction(customerId : Principal, productId : Text, rating : Nat, review : Text) {
  //   let id = Nat.toText(customerInteractions.size());
  //   let interaction = {
  //     id;
  //     customerId;
  //     productId;
  //     rating;
  //     review;
  //     timestamp = Time.now();
  //   };
  //   customerInteractions.put(id, interaction);
  // };

  // Function to get all products
  public query func getAllProducts() : async [Types.FoodProduct] {
    return Iter.toArray(foodProducts.vals());
  };

  // Function to get product by id
  public query func getProduct(id : Text) : async ?Types.FoodProduct {
    return foodProducts.get(id);
  };

  // Function to get user profile by id
  public query func getUserProfile(id : Principal) : async ?Types.UserProfile {
    return userProfiles.get(id);
  };

  // Function to get all orders
  public query func getAllOrders() : async [Types.Order] {
    return Iter.toArray(orders.vals());
  };
};