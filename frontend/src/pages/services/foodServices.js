import { foodData } from "../../data";

export const getAllFoods = async () => {
  return foodData;
};

export const getFoodsBySearchTerm = (searchTerm) => {
  return foodData.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const getFoodById = (id) => {
  return foodData.find((food) => food.id === id);
};

export const getFoodsByCategory = (category) => {
  return foodData.filter(
    (food) => food.category.toLowerCase() === category.toLowerCase()
  );
};

export const getFoodsByRestaurant = (restaurant) => {
  return foodData.filter(
    (food) => food.restaurant.toLowerCase() === restaurant.toLowerCase()
  );
};

export const getFoodsByPrice = (price) => {
  return foodData.filter((food) => food.price === price);
};

export const getFoodsByRating = (rating) => {
  return foodData.filter((food) => food.rating === rating);
};
