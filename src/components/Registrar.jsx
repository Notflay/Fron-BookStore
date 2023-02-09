import Button from "react-bootstrap/Button";
import React from "react";
import Form from "react-bootstrap/Form";
import { getToken } from "../helpers/auth_helpers";
import { createUsuario, logpage } from "../services/axios.service";
import Cookies from "universal-cookie";

const Registrar = ({ changeShutInit }) => {
  function formData(e) {
    createUsuario(e)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div
      style={{
        width: "1130px",
        margin: "auto",
        padding: "25px",
        marginTop: "50px",
        marginBottom: "210px",
      }}
      onClick={changeShutInit}
    >
      <form
        style={{ marginLeft: "290px" }}
        onSubmit={(e) => {
          e.preventDefault();
          formData({
            correo: e.target[0].value,
            nombre: e.target[1].value,
            apellidos: e.target[2].value,
            pass: e.target[3].value,
          });
        }}
      >
        <Form.Floating
          className="mb-3"
          style={{
            width: "75%",
            margin: "0px",
          }}
        >
          <Form.Control
            id="floatingInputCustom"
            type="email"
            placeholder="name@example.com"
            style={{
              border: "none ",
              borderRadius: "0px",
              borderBottom: "solid 0.5px",
            }}
          />
          <label htmlFor="floatingInputCustom">Ingrese un correo</label>
        </Form.Floating>
        <Form.Floating
          className="mb-3"
          style={{
            width: "75%",
            margin: "0px",
          }}
        >
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Ingrese nombre"
            style={{
              border: "none ",
              borderRadius: "0px",
              borderBottom: "solid 0.5px",
            }}
          />
          <label htmlFor="floatingInputCustom">Ingrese nombre</label>
        </Form.Floating>
        <Form.Floating
          className="mb-3"
          style={{
            width: "75%",
            margin: "0px",
          }}
        >
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Ingrese apellidos"
            style={{
              border: "none ",
              borderRadius: "0px",
              borderBottom: "solid 0.5px",
            }}
          />
          <label htmlFor="floatingInputCustom">Ingrese apellidos</label>
        </Form.Floating>
        <Form.Floating
          style={{
            width: "75%",
          }}
        >
          <Form.Control
            id="floatingPasswordCustom"
            type="password"
            placeholder="Password"
            style={{
              border: "none ",
              borderRadius: "0px",
              borderBottom: "solid 0.5px",
            }}
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
        <div
          className="d-grid gap-2"
          style={{ marginTop: "35px", width: "590px" }}
        >
          <Button variant="primary" size="lg" type="submit">
            Crear cuenta
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registrar;
