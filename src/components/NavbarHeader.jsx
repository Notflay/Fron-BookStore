import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";
import { controlStock } from "../utils/controlls";
import Cookies from "universal-cookie";

import Form from "react-bootstrap/Form";

import React from "react";
import {
  deleteAllCart,
  deleteAllCt,
  getCart,
  loginUsuario,
  precioBook,
  updateCart,
  updateVenta,
} from "../services/axios.service";
import { useNavigate } from "react-router-dom";

const NavbarHeader = ({
  carrito,
  preCompras,
  getVentasBooks,
  subTotal,
  active,
  changeActiveNav,
  deletePreVenta,
  shutInit,
  changeShutInit,
  showIinit,
}) => {
  const navigate = useNavigate();

  function updateVentaNav(id, body) {
    updateVenta(id, body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getVentasBooks();
      });
  }

  function deslog() {
    const cookies = new Cookies();
    cookies.remove("jwtToken");
    cookies.remove("id");
    getVentasBooks();
  }

  function login(e) {
    e.preventDefault();
    loginUsuario({
      correo: e.target[0].value,
      pass: e.target[1].value,
    })
      .then((response) => {
        const cookies = new Cookies();
        cookies.set("id", response.data.id);
        cookies.set("jwtToken", response.data.sign, { path: "/" });
        getVentasBooks();
        alert("Logeado exitosamente");
      })
      .catch((error) => {
        console.log(error);
      });
    const cookies = new Cookies();
    if (cookies.get("jwtToken")) {
      return navigate("/FormPagar");
    }
  }

  async function deleteAll() {
    const cookies = new Cookies();
    const id = cookies.get("id");
    if (id !== undefined) {
      await deleteAllCt(id).then(() => getVentasBooks());
    }
  }

  async function doubleFunction(e, pre) {
    controlStock(e);

    const cookies = new Cookies();
    const id = cookies.get("id");
    const cart = await getCart(id);
    const list = cart.data;

    let k = -1;
    list.map((data, key) => (data.id === `${pre.id}` ? (k = key) : null));

    const obj = {
      order: k,
      cantidad: e.target.value,
      priceOld: pre.priceOld,
    };

    await updateCart(id, obj).then(() => getVentasBooks());
  }

  return (
    <div className="fixed-top">
      <div>
        <div className="navbar" style={{ height: "81px" }}>
          <div className="container">
            <div style={{ marginLeft: "150px" }} onClick={changeShutInit}>
              <a href="#/">
                <img
                  src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/logos_bnp.png"
                  alt="data"
                />
              </a>
              <a href="#/">
                <img
                  src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/Libreria-virtual-Logo.png"
                  alt="data"
                  style={{ height: "60px" }}
                />
              </a>
            </div>
            <div
              style={{
                display: "flex",
                flexBasis: "auto",
                flexGrow: "1",
                alignItems: "center",
                marginLeft: "520px",
              }}
            >
              <div
                onClick={() => {
                  navigate("/");
                }}
                style={{ cursor: "pointer" }}
              >
                <HomeIcon
                  style={{
                    color: "orange",
                  }}
                >
                  {" "}
                </HomeIcon>
                <span>Inicio</span>
              </div>
              <div style={{ marginLeft: "25px" }}>
                <AccountCircleIcon
                  style={{
                    color: "orange",
                  }}
                  onClick={changeActiveNav}
                  onMouseDown={() => {
                    changeShutInit(true);
                  }}
                ></AccountCircleIcon>
                {shutInit === true ? (
                  <div
                    style={{
                      position: "absolute",
                      height: "374px",
                      width: "250px",
                      backgroundColor: "white",
                      top: "59px",
                      left: "1290px",
                      borderRadius: "10px",
                      border: "1px solid #b4b4b4",
                    }}
                  >
                    {showIinit === true ? (
                      <div style={{ backgroundColor: "white" }}>
                        <p
                          style={{
                            position: "absolute",
                            fontWeight: "bold",
                            textAlign: "center",
                            paddingTop: "10px",
                            marginLeft: "35px",
                            color: "orange",
                          }}
                        >
                          {"Ya iniciaste sesión :) !"}
                        </p>
                        <Button
                          className="btn btn-warning"
                          style={{
                            marginLeft: "65px",
                            marginTop: "50px",
                            position: "absolute",
                          }}
                          onClick={deslog}
                        >
                          Deslogearse
                        </Button>
                        <img
                          src="/dynamic-card-knows-how-to-push-the-shopping-cart-to-buy-things-gif_2515304(1).gif"
                          alt="gif"
                        />
                      </div>
                    ) : (
                      <div>
                        <p
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            paddingTop: "10px",
                          }}
                        >
                          Iniciar Sesión
                        </p>
                        <form
                          onSubmit={(e) => {
                            login(e);
                          }}
                        >
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label
                              style={{
                                width: "220px",
                                marginLeft: "15px",
                              }}
                            >
                              Ingrese correo
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="example@gmail.com"
                              style={{
                                borderRadius: "0px",
                                boxShadow:
                                  "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
                                width: "220px",
                                marginLeft: "15px",
                              }}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label
                              style={{
                                width: "220px",
                                marginLeft: "15px",
                              }}
                            >
                              Ingrese contraseña
                            </Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="****************"
                              style={{
                                borderRadius: "0px",
                                boxShadow:
                                  "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
                                width: "220px",
                                marginLeft: "15px",
                              }}
                            />
                          </Form.Group>
                          <Button
                            variant="warning"
                            size="lg"
                            type="submit"
                            style={{
                              borderRadius: "0px",
                              boxShadow:
                                "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",

                              color: "white",
                              width: "220px",
                              marginLeft: "15px",
                              height: "35px",
                            }}
                          >
                            <p
                              style={{
                                position: "absolute",
                                top: "224px",
                                marginLeft: "35px",
                              }}
                            >
                              Iniciar Sesión
                            </p>
                          </Button>
                        </form>
                        <p
                          style={{
                            textAlign: "center",
                            marginBottom: "2px",
                            marginTop: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          ¿Eres nuevo?
                        </p>
                        <Button
                          variant="warning"
                          size="lg"
                          type="submit"
                          style={{
                            borderRadius: "0px",
                            boxShadow:
                              "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",

                            color: "white",
                            width: "220px",
                            marginLeft: "15px",
                            height: "35px",
                            marginTop: "20px",
                            backgroundColor: "red",
                            border: "none",
                          }}
                          onClick={() => {
                            navigate("/registrar");
                          }}
                        >
                          <p
                            style={{
                              position: "absolute",
                              top: "314px",
                              marginLeft: "35px",
                            }}
                          >
                            Crear cuenta
                          </p>
                        </Button>
                      </div>
                    )}
                  </div>
                ) : null}
                <span>Ingrese</span>
              </div>

              <div style={{ marginLeft: "25px" }} onClick={changeShutInit}>
                <ShoppingCartIcon
                  style={{ color: "orange" }}
                  onClick={() => {
                    changeActiveNav(true);
                  }}
                  onMouseDown={() => {
                    changeShutInit();
                  }}
                ></ShoppingCartIcon>

                <div danger="true" className="badge badge-danger">
                  <span>{carrito}</span>
                </div>
              </div>
              <span style={{ marginLeft: "2px" }}>Carrito</span>
            </div>
          </div>
        </div>
        <div className="navbartwo" onClick={changeShutInit}></div>
      </div>
      {active ? (
        <div
          style={{
            backgroundColor: "white",
            width: "300px",
            height: "374px",
            position: "absolute",
            marginTop: "-65px",
            marginLeft: "1390px",
            borderRadius: "10px",
            border: "1px solid #b4b4b4",
            boxSizing: "border-box",
            fontWeight: "500",
          }}
        >
          <div className="cotainer">
            <br />
            <div style={{ marginLeft: "20px" }}>
              <button
                onClick={deleteAll}
                style={{ border: "none", backgroundColor: "white" }}
              >
                <DeleteIcon></DeleteIcon>
              </button>
              <span className="fas fa-trash" style={{ padding: "3px" }}></span>
              Sub total
              <b style={{ marginLeft: "15px" }}>{subTotal.toFixed(2)}</b>
              <br
                style={{
                  border: "0",
                  borderTop: "1px solid rgba(0,0,0,.1)",
                  boxSizing: "initial",
                  height: "0",
                }}
              />
            </div>

            <div className="w-100">
              <hr />
            </div>
            <div
              style={{
                position: "absolute",
                width: "298px",
                background: "#fff",
                height: "auto",

                boxSizing: "border-box",
                fontFamily: "Roboto,Helvetica Neue,sans-serif",
                fontWeight: "300",
                maxHeight: "240px",
                marginTop: "-15px",
              }}
            >
              <ul
                style={{
                  padding: "0",
                  margin: "0",
                  maxHeight: "240px",
                  overflowY: "auto",
                  boxSizing: "border-box",
                  fontFamily: "Roboto,Helvetica Neue,sans-serif",
                  fontWeight: "300",
                  textAlign: "left",
                }}
              >
                {preCompras.length > 0 ? (
                  preCompras.map((pre, key) => {
                    return (
                      <li
                        style={{
                          position: "relative",
                          listStyle: "none",
                          padding: "0px",

                          fontFamily: "Roboto,Helvetica Neue,sans-serif",
                          fontWeight: "300",
                          fontSize: "1rem",
                          lineHeight: "1.5",
                          color: "#212529",
                          textAlign: "left",
                        }}
                        key={key}
                      >
                        <div style={{ marginBottom: "45px" }}>
                          <img
                            src={pre.image}
                            alt="data"
                            style={{
                              heigth: "105px",
                              width: "75px",
                              boxShadow: "5px",
                            }}
                          ></img>
                          <p
                            style={{
                              position: "absolute",
                              marginLeft: "100px",
                              marginTop: "-80px",
                              fontWeight: "bold",
                            }}
                          >
                            {pre.title}
                          </p>
                          <p
                            style={{
                              position: "absolute",
                              marginLeft: "10px",
                              marginTop: "2px",
                            }}
                          >
                            S/.{pre.price}
                          </p>
                          <p
                            style={{
                              position: "absolute",
                              marginLeft: "100px",
                              marginTop: "2px",
                            }}
                          >
                            Cantidad:
                          </p>
                          <input
                            type={"number"}
                            min="1"
                            max={"10"}
                            onChange={(e) => {
                              doubleFunction(e, pre);
                            }}
                            style={{
                              position: "absolute",
                              marginTop: "85px",
                              marginLeft: "110px",
                              width: "40px",
                            }}
                            defaultValue={pre.cantidad}
                          ></input>
                        </div>
                        <DeleteIcon
                          style={{
                            position: "absolute",
                            marginTop: "-45px",
                            marginLeft: "230px",
                            width: "40px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            const cookies = new Cookies();
                            const id = cookies.get("id");
                            deletePreVenta(id, pre.id);
                          }}
                        ></DeleteIcon>
                        <hr />
                      </li>
                    );
                  })
                ) : (
                  <p className="text-center p-4 fw-bold">¡Inicia sesión!</p>
                )}
              </ul>
            </div>
            <hr style={{ marginTop: "240px" }} />
            <div className="row w-100">
              <div className="col-sm-12 p-3">
                <Button
                  variant="primary"
                  size="lg"
                  style={{
                    backgroundColor: "orange",
                    borderColor: "orange",
                    borderRadius: "5px",
                    fontWeight: "600",
                    marginLeft: "25px",
                    marginTop: "-29px",
                    width: "250px",
                    height: "45px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (preCompras.length < 1) {
                      alert("Aún no tienes una pre compra");
                    } else {
                      navigate("/carrito");
                    }
                  }}
                >
                  Ver carrito
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavbarHeader;
