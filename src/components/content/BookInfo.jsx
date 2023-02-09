import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addCart,
  getBookForIsbn,
  ventaBook,
} from "../../services/axios.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "./components/Image";
import DetailsBook from "./components/DetailsBook";
import PriceBook from "./components/PriceBook";
import Cookies from "universal-cookie";

const BookInfo = ({
  changeCarro,
  carrito,
  getVentasBooks,
  changeActiveNav,
  changeShutInit,
}) => {
  const paramsID = useParams();
  const [book, setBook] = useState();
  const [priceF, setPriceF] = useState();
  const [cantidad, setCantidad] = useState(1);

  function bookInfo(isbn) {
    getBookForIsbn(isbn)
      .then((response) => {
        setBook({
          ...response.data,
          price: parseFloat(response.data.price.slice(1)),
        });
        setPriceF(parseFloat(response.data.price.slice(1)));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    bookInfo(paramsID.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function aumentarPrecio(e) {
    if (e > 0) {
      setBook({ ...book, price: priceF * e });
    } else {
      setBook({ ...book, price: priceF });
    }
    setCantidad(e);
  }

  function aumentarCarrito() {
    changeCarro(carrito + 1);
  }

  async function incrementarVenta() {
    const body = {
      isbn13: book.isbn13,
      title: book.title,
      desc: book.desc,
      price: parseFloat(book.price.toFixed(2)),
      image: book.image,
      cantidad: parseInt(cantidad),
      priceOld: parseFloat(book.price.toFixed(2)) / parseInt(cantidad),
    };

    const cookies = new Cookies();
    const id = cookies.get("id");
    if (id !== undefined) {
      await addCart(id, body);
      getVentasBooks();
    } else {
      alert("Primero tienes que iniciar sesión");
    }
  }

  return (
    <div
      style={{ width: "59.4%", margin: "auto", marginBottom: "150px" }}
      onClick={changeActiveNav}
    >
      <div onClick={changeShutInit}>
        <a href="../" style={{ textDecoration: "none", marginLeft: "60px" }}>
          {" "}
          {"<< Regresar"}{" "}
        </a>{" "}
      </div>
      {book ? (
        <Container onClick={changeShutInit}>
          <Row>
            <Col>
              <Image img={book.image} rating={book.rating} />
            </Col>
            <Col xs={5}>
              <DetailsBook
                title={book.title}
                subtitle={book.subtitle}
                description={book.desc}
                author={book.authors}
                publisher={book.publisher}
                year={book.year}
                pages={book.pages}
                rating={book.rating}
                aumentarPrecio={aumentarPrecio}
              />
            </Col>
            <Col xs={3}>
              <PriceBook
                price={book.price}
                aumentarCarrito={aumentarCarrito}
                incrementarVenta={incrementarVenta}
                getVentasBooks={getVentasBooks}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="load"></div>
      )}
    </div>
  );
};

export default BookInfo;
