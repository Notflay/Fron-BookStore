import React, { useEffect, useState } from "react";

import NavbarHeader from "./NavbarHeader";
import Content from "./Content";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookInfo from "./content/BookInfo";
import Pie from "./content/components/pie";
import { deleteElmtCart, getCart } from "../services/axios.service";
import Carrito from "./Carrito";
import Registrar from "./Registrar";
import FormPagar from "./content/FormPagar";
import Cookies from "universal-cookie";

const Index = () => {
  const [carrito, setCarrito] = useState(0);
  const [preCompras, setPreCompras] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [active, setActive] = useState(false);
  const [shutInit, setShutInit] = useState(false);
  const [showIinit, setShowIinit] = useState(false);

  function changeShutInit(param) {
    if (param === true) {
      setShutInit(true);
      const cookies = new Cookies();
      if (cookies.get("jwtToken")) {
        setShowIinit(true);
      } else {
        setShowIinit(false);
      }
    } else {
      setShutInit(false);
    }
  }

  async function deletePreVenta(id, body) {
    // El primer id es del usuario que se logeo y el segundo es el id del elemento que desea eliminar
    if (id !== undefined) {
      await deleteElmtCart(id, body).then(() => getVentasBooks());
    }
  }

  function changeCarro(e) {
    setCarrito(e);
  }

  async function changeActiveNav(param) {
    if (param === true) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  async function getVentasBooks() {
    try {
      const cookies = new Cookies();
      const id = cookies.get("id");
      if (id !== undefined) {
        const cart = await getCart(id);
        setPreCompras(cart.data);
        let i = 0;
        cart.data.map((data) => (i += data.price));
        setSubTotal(i);
        setCarrito(cart.data.length);
      } else {
        setPreCompras([]);
        setSubTotal(0);
        setCarrito(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getVentasBooks();
  }, []);

  return (
    <Router>
      <div style={{ marginBottom: "120px" }}>
        <NavbarHeader
          carrito={carrito}
          preCompras={preCompras}
          getVentasBooks={getVentasBooks}
          subTotal={subTotal}
          changeActiveNav={changeActiveNav}
          active={active}
          deletePreVenta={deletePreVenta}
          shutInit={shutInit}
          changeShutInit={changeShutInit}
          showIinit={showIinit}
        />
      </div>
      <hr
        style={{
          border: "0",
          borderTop: "1px solid rgba(0,0,0,0.5)",
          boxSizing: "initial",
          height: "0",
          overflow: "visible",
          fontFamily: "Roboto,Helvetica Neue,sans-serif",
          fontWeight: "300",
          color: "#212529",
          lineHeight: 1.5,
        }}
      />
      <main>
        <Routes>
          <Route
            index
            element={
              <Content
                changeActiveNav={changeActiveNav}
                changeShutInit={changeShutInit}
              />
            }
          />
          <Route
            path="/book/:id"
            element={
              <BookInfo
                changeCarro={changeCarro}
                carrito={carrito}
                getVentasBooks={getVentasBooks}
                changeActiveNav={changeActiveNav}
                changeShutInit={changeShutInit}
              />
            }
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                preCompras={preCompras}
                getVentasBooks={getVentasBooks}
                subTotal={subTotal}
                changeActiveNav={changeActiveNav}
                deletePreVenta={deletePreVenta}
                changeShutInit={changeShutInit}
              />
            }
          />

          <Route
            path="/FormPagar"
            element={
              <FormPagar
                subTotal={subTotal}
                getVentasBooks={getVentasBooks}
                showIinit={showIinit}
                changeShutInit={changeShutInit}
              />
            }
          />

          <Route
            path="/registrar"
            element={<Registrar changeShutInit={changeShutInit} />}
          />
        </Routes>
      </main>
      <Pie changeShutInit={changeShutInit} />
    </Router>
  );
};

export default Index;
