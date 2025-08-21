import { getProduct } from "./api_products";

// add product to cart
export async function AddToCart(product) {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const existingProduct = cart.find((p) => p._id === product._id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

// get all items in the cart
export function getCart() {}

// update the cart to local storage
export function updateCart(cart) {}

// delete item from the cart
export function deleteItemFromCart(id) {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const updatedCart = cart.filter((p) => {
    if (p._id !== id) {
      return true;
    } else {
      return false;
    }
  });
  //   setSessions(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
}
