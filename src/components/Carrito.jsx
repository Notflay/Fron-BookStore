import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { controlStock } from "../utils/controlls";
import { precioBook, updateVenta } from "../services/axios.service";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";

const Carrito = ({
  preCompras,
  getVentasBooks,
  subTotal,
  changeActiveNav,
  deletePreVenta,
}) => {
  const navigate = useNavigate();

  function doubleFunction(e, pre) {
    controlStock(e);
    precioBook(pre.isbn13)
      .then((response) => {
        const body = {
          isbn13: pre.isbn13,
          title: pre.title,
          desc: pre.desc,
          image: pre.image,
          cantidad: e.target.value,
          price: parseFloat(response.data.slice(1)) * e.target.value,
        };
        body.price = body.price.toFixed(2);
        updateVenta(pre._id, body)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            getVentasBooks();
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function dirigaForm() {
    const cookies = new Cookies();

    if (cookies.get("jwtToken")) {
      return navigate("/FormPagar");
    } else {
      alert(`Iniciar sesión para comprar`);
    }
  }

  return (
    <div style={{ width: "1500px", margin: "auto" }} onClick={changeActiveNav}>
      <Container>
        {" "}
        {preCompras.length >= 1 ? (
          <Row xs={1} md={1}>
            {preCompras.map((pre, key) => {
              return (
                <Col key={key}>
                  <div style={{ marginLeft: "380px", padding: "10px" }}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={pre.image} />
                      <Card.Body>
                        <Card.Title>{pre.title}</Card.Title>
                        <Card.Text>
                          <div>
                            S/ {(pre.price / pre.cantidad).toFixed(2)}
                            <p
                              style={{
                                bottom: "-85px",
                              }}
                            >
                              Cantidad:
                              <input
                                type={"number"}
                                min="1"
                                max={"10"}
                                onChange={(e) => {
                                  doubleFunction(e, pre);
                                }}
                                style={{
                                  width: "40px",
                                  marginLeft: "10px",
                                }}
                                defaultValue={pre.cantidad}
                              />
                              <span style={{ marginLeft: "25px" }}>
                                <DeleteIcon
                                  sx={{
                                    fontSize: "40px",
                                    cursor: "pointer",
                                    marginleft: "15px",
                                  }}
                                  onClick={() => deletePreVenta(pre._id)}
                                ></DeleteIcon>
                              </span>
                            </p>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              );
            })}
            <div
              style={{
                position: "absolute",

                top: "190px",
                marginLeft: "1005px",
                width: "270px",
              }}
            >
              <div>
                <h5
                  style={{
                    border: "1px solid #dee2e6",
                    padding: "5px",
                    backgroundColor: "rgba(0,0,0,.03)",
                  }}
                >
                  Total a pagar
                </h5>
                <div
                  style={{
                    border: "1px solid #dee2e6",
                    height: "90px",
                    marginTop: "-9px",
                    padding: "10px",
                  }}
                >
                  <p style={{ color: "orange", fontSize: "23px" }}>
                    <span style={{ color: "#10100", fontSize: "15px" }}>
                      S/
                    </span>{" "}
                    {subTotal.toFixed(2)}
                  </p>
                  <div style={{ marginTop: "-10px" }}>
                    <Button
                      variant="primary"
                      size="lg"
                      style={{
                        backgroundColor: "white",
                        borderColor: "orange",
                        borderRadius: "5px",
                        fontWeight: "150px",
                        width: "210px",
                        color: "orange",
                        height: "28px",
                      }}
                    >
                      <ShoppingBagIcon
                        style={{
                          position: "absolute",
                          top: "88px",
                          left: "81px",
                        }}
                      ></ShoppingBagIcon>
                      <p
                        style={{
                          position: "absolute",
                          top: "85px",
                          left: "110px",
                        }}
                        onClick={dirigaForm}
                      >
                        Pagar
                      </p>
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </Row>
        ) : (
          <div>{"NO FOUND :("}</div>
        )}{" "}
      </Container>
    </div>
  );
};

export default Carrito;
