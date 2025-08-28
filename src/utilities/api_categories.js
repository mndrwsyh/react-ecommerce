import axios from "axios";
import { API_URL } from "./constants";

export async function getCategories(category, page = 1) {
  const response = await axios.get(API_URL + "categories");
  return response.data;
}
export async function getcategory(id) {
  const response = await axios.get(API_URL + "categories/" + id);
  //GET http:///sjdksjvnkjsblablabla
  return response.data;
}

export async function addCategory(label) {
  const response = await axios.post(API_URL + "categories", {
    label,
  });
  return response.data;
}

export async function updateCategory(id, label) {
  const response = await axios.put(API_URL + "categories/" + id, {
    label: label,
  });
  return response.data;
}
export async function deleteCategory(id) {
  const response = await axios.delete(API_URL + "categories/" + id);
  return response.data;
}
