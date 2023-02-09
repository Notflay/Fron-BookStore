import  { localDB } from "../utils/config/apiconfig";


function getBooksAllDB() {
  return localDB.get("/findBook", {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function getBooksForTtile(title) {
  return localDB.get(`/getBooksForTitle/${title}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function getAuthor(author) {
  return localDB.get(`/getAuthors/${author}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function getBookForAuthorUnique(author) {
  return localDB.get(`/getAuthorUnique/${author}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function getBookForIsbn(isbn) {
  return localDB.get(`/getBookForIsbn/${isbn}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function getBookForPrice(body) {
  return localDB.post(`/getBookForPrice`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function getBookYear(year) {
  return localDB.get(`/booksForYear/${year}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function ventaBook(body) {
  return localDB.post(`/createventa`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function viewVentas() {
  return localDB.get(`/viewventas`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function deleteVenta(isbn13) {
  return localDB.delete(`/deleteventa/${isbn13}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function updateVenta(id, body) {
  return localDB.put(`/updateVenta/${id}`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function precioBook(id) {
  return localDB.get(`/precioBook/${id}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function getForRating(id) {
  return localDB.get(`/getRating/${id}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function createUsuario(data) {
  return localDB.post(`/createUsuario`, data, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function loginUsuario(data) {
  return localDB.post(`/loginUsuario`, data, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function logpage() {
  return localDB.get(`/autorizacion`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function pageApi(body) {
  return localDB.post("/api/checkout", body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function deleteAll() {
  return localDB.delete("/deleteAll", {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

// Carrito de compras

function addCart(id, body) {
  return localDB.put(`/updateUser/${id}`, body, {
    validateStatus: function (status) {
      return status < 5000;
    },
  });
}

function getCart(id) {
  return localDB.get(`/getCart/${id}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function updateCart(id, body) {
  return localDB.put(`/updateCart/${id}`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function deleteElmtCart(id, body) {
  return localDB.put(`/deleteElemntCart/${id}`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

function deleteAllCt(id) {
  return localDB.put(`/deleteAllCart/${id}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
}

export {

  getBooksAllDB,
  getBooksForTtile,
  getAuthor,
  getBookForAuthorUnique,
  getBookForIsbn,
  getBookForPrice,
  getBookYear,
  ventaBook,
  viewVentas,
  deleteVenta,
  updateVenta,
  precioBook,
  getForRating,
  createUsuario,
  loginUsuario,
  logpage,
  pageApi,
  deleteAll,
  addCart,
  getCart,
  updateCart,
  deleteElmtCart,
  deleteAllCt,
};
