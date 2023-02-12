import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Paginator = ({
  getBooksAll,
  booksPage,
  filtros,
  ordenForPrice,
  books,
  changeFiltrados,
  resetPage,
}) => {
  const [click, setClick] = useState();

  let active = click;
  let items = [];
  if (booksPage > 8) {
    booksPage = 8;
  }

  function numberBooks(number) {
    if (number === 1) {
      getBooksAll(0, 10);
    } else {
      getBooksAll(number * 10 - 10, number * 10);
    }
  }

  function doubleFunction(number) {
    setClick(number);
    numberBooks(number);
  }

  for (let number = 1; number <= booksPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => {
          doubleFunction(number);
        }}
        active={number === active}
        id="paginationColor"
      >
        {number}
      </Pagination.Item>
    );
  }

  const estilo =
    booksPage < 1 ? { marginTop: "-40px" } : { position: "absolute" };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={estilo}>
        {books.length < 400 ? (
          <Button
            variant="warning"
            size="lg"
            type="submit"
            style={{ color: "white", padding: "4px" }}
            onClick={() => {
              resetPage();
            }}
          >
            Eliminar filtro
          </Button>
        ) : null}
      </div>

      <Pagination size="sm" style={{ marginLeft: "20%" }}>
        {items}
      </Pagination>

      <div style={(estilo, { marginTop: "-40px", marginLeft: "610px" })}>
        <FloatingLabel
          controlId="floatingSelect"
          label="Ordenar por: "
          style={{ width: "250px" }}
        >
          <Form.Select aria-label="Floating label select example">
            <option>Open this select menu</option>
            <option value="1" onClick={(e) => ordenForPrice(e.target.value)}>
              Precio de menor a mayor
            </option>
            <option value="2" onClick={(e) => ordenForPrice(e.target.value)}>
              Precio de mayor a menor
            </option>
          </Form.Select>
        </FloatingLabel>
      </div>
    </div>
  );
};

export default Paginator;
