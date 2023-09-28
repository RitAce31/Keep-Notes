import axios from "axios";

const URL = "http://127.0.0.1:8000/api/";

export const getNote = () => {
  const apiUrl = URL + "notes";
  return axios.get(apiUrl);
};

export const delNote = (id) => {
  const apiUrl = URL + "delete-notes" + "/" + id;
  return axios.delete(apiUrl);
};

export const addNote = (obj) => {
  const apiUrl = URL + "add-notes";
  return axios.post(apiUrl, obj);
};

export const updateNote = (id, para) => {
  const apiUrl = URL + "update-notes" + "/" + id;
  return axios.put(apiUrl, para);
};
