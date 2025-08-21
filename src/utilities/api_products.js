import axios from "axios";

const API_URL = "http://localhost:5123/";

export async function getProducts(category, page = 1) {
  const response = await axios.get(
    API_URL +
      "products?page=" +
      page +
      (category === "All" ? "" : "&category=" + category)
  );
  return response.data;
}
export async function getProduct(id) {
  const response = await axios.get(API_URL + "products/" + id);
  //GET http:///sjdksjvnkjsblablabla
  return response.data;
}

export async function addProduct(name, description, price, category) {
  const response = await axios.post(API_URL + "products", {
    name: name,
    description: description,
    price: price,
    category: category,
  });
  return response.data;
}

export async function updateProduct(id, name, description, price, category) {
  const response = await axios.put(API_URL + "products/" + id, {
    name: name,
    description: description,
    price: price,
    category: category,
  });
  return response.data;
}
export async function deleteProduct(id) {
  const response = await axios.delete(API_URL + "products/" + id);
  return response.data;
}
