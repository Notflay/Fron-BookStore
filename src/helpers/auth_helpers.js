import axios from "axios";

const TOKEN_KEY = "CARRITO_COMPRAS_KEY";

export function setToken(token) {
  let lista = [];
  lista.push(token);
  console.log(lista);
  /* if (getToken()) {
    let lista = [];
    const data = getToken();
    lista.push(data, JSON.stringify(token));
    console.log(lista);
     localStorage.setItem(TOKEN_KEY, lista);
  } else {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  } */

  localStorage.setItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
