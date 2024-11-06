import axios from "axios";

const API_URL =
  "https://usermanagementportalfrontend-gpgegxbqcbgncngz.canadacentral-01.azurewebsites.net/api/Task"; // Use a mock API endpoint

export const getTodos = () => axios.get(API_URL);
export const createTodo = (todo) => axios.post(API_URL, todo);
export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
