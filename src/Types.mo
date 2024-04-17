import Result "mo:base/Result";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Text "mo:base/Text";


module {
  public type Result<T, E> = Result.Result<T, E>;
  public type UserProfile = {
    name: Text;
    address: Text;
    phone: Int;
    image: Text;
    account: Principal;
  };

  public type UserProfilePayload = {
    name: Text;
    address: Text;
    phone: Int;
    image: Text;
  };

  public type FoodProduct = {
    productId: Text;
    name: Text;
    description: Text;
    price: Nat;
    quantityAvailable: Nat;
    reviews: List.List<Text>;
    category: Text;
    author: Principal;
  };

  public type FoodProductPayload = {
    name: Text;
    description: Text;
    price: Nat;
    category: Text;
    quantityAvailable: Nat;
  };

  public type UpdateProductPayload = {
    productId: Text;
    price: Nat;
    quantityAvailable: Nat;
  };

  public type Order = {
    id: Nat;
    customerId: Principal;
    productId: Text;
    quantity: Nat;
    status: OrderState;
    createdAt: Int;
    updatedAt: Int;
  };

  public type OrderPayload = {
    productId: Text;
    quantity: Nat;
  };

  public type OrderState = {
      #failed : Text;
      #placed;
      #confirmed;
      #delivered;
      #cancelled;
  };

  public type CustomerInteraction = {
    id: Text;
    customerId: Principal;
    productId: Text;
    review: Text;
    timestamp: Int;
  };

  public type CustomerInteractionPayload = {
    productId: Text;
    review: Text;
  };

}
