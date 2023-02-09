import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { deleteAll, deleteAllCt, pageApi } from "../../services/axios.service";
import axios from "axios";
import { Checkbox } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51MWLL2L4SPD0MxRcyV9eR8iQv4Jx3NqWCLIuWvPvL58Pjh4IVrP0DoYqjqmxXg69wqkDPhejIVB5iTSciJA7rt8k00jGCqBVto"
);

export default function FormPagar({ subTotal, getVentasBooks }) {
  const navigate = useNavigate();

  const [regions, setRegions] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  const [active, setActive] = useState(false);

  useEffect(() => {
    getRegions();
  }, []);

  const cookies = new Cookies();
  if (!cookies.get("jwtToken")) {
    return navigate("/");
  }

  async function getProvi(id) {
    const proviResponse = await axios.get(
      `https://api.kaituperu.com/api/Provinces?filter={%22where%22:%20{%22regionId%22:%20%22${id}%22%20}}`
    );
    setProvincias(proviResponse.data);
    setDistritos([]);
  }

  async function getDistric(id) {
    const distritoResponse = await axios.get(
      `https://api.kaituperu.com/api/Districts?filter={%22where%22:%20{%22provinceId%22:%20%22${id}%22%20}}`
    );
    setDistritos(distritoResponse.data);
  }

  async function getRegions() {
    const regionsResponse = await axios.get(
      "https://api.kaituperu.com/api/Regions"
    );
    setRegions(regionsResponse.data);
  }



  async function handleSubmit(e, stripeus, elements) {
    try {
      e.preventDefault();
      const vaOne = parseInt(document.getElementById("regionId").value);
      const vaTwo = parseInt(document.getElementById("provinciaid").value);
      const vaThre = parseInt(document.getElementById("distritoId").value);
      const direc = document.getElementById("direccionId").value;
      const telef = document.getElementById("telefoID").value;
      const compId = parseInt(document.getElementById("comprobanteId").value);
      if (
        (vaOne === 0) |
        (vaTwo === 0) |
        (vaThre === 0) |
        (direc.trim() === "") |
        (telef.length < 9) |
        (compId === 0)
      ) {
        alert("No has terminado de llenar los datos");
      } else {
        const { error, paymentMethod } = await stripeus.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });
        const cookies = new Cookies();
        const idUser = cookies.get("id");

        if (!error) {
          const { id } = paymentMethod;
          pageApi({ id, amount: subTotal })
            .then(async (response) => {
              
            })
            .catch((error) => {
              console.log(error);
            }).finally(async () => {
              if (idUser !== undefined) {
                console.log("diferente")
                await deleteAllCt(idUser).then(() => getVentasBooks());
              }
            });
          alert(`Compra exitosa. Espera tu producto`);
          return navigate("/");
        } else {
          alert(`${error.message}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const CheckForm = () => {
    const stripeus = useStripe();
    const elements = useElements();

    return (
      <form
        onSubmit={(e) => handleSubmit(e, stripeus, elements)}
        className="card cad-body"
      >
        <div className="form-group">
          <CardElement className="form-control" />
        </div>

        <div style={{ padding: "5px", width: "150px" }}>
          <button
            className="btn btn-success"
            disabled={!stripeus}
            style={{ width: "399px" }}
          >
            Buy
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container" style={{ height: "750px" }}>
      <div>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ marginLeft: "440px" }}
        >
          <Form.Label>Region</Form.Label>
          <div>
            <select
              id="regionId"
              name="regionId"
              style={{
                borderRadius: "0px",
                boxShadow:
                  "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
                width: "410px",
                backgroundColor: "white",
                border: "1px solid #ced4da",
                padding: ".375rem .75rem",
                fontSize: "1rem",
                fontWeight: "1.5",
                appearance: "none",
                transition:
                  "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                lineHeight: "1.5",
                color: "#212529",
              }}
            >
              <option value={0} onClick={() => setProvincias([])}>
                Selecciona la region
              </option>
              {regions.map((reg, key) => (
                <option
                  onClick={() => getProvi(reg.id)}
                  key={key}
                  value={key + 1}
                >
                  {reg.name}
                </option>
              ))}
            </select>
          </div>
        </Form.Group>
      </div>
      <div>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ marginLeft: "440px" }}
        >
          <Form.Label>Provincia</Form.Label>
          <div>
            <select
              id="provinciaid"
              name="provincia"
              style={{
                borderRadius: "0px",
                boxShadow:
                  "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
                width: "410px",
                backgroundColor: "white",
                border: "1px solid #ced4da",
                padding: ".375rem .75rem",
                fontSize: "1rem",
                fontWeight: "1.5",
                appearance: "none",
                transition:
                  "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                lineHeight: "1.5",
                color: "#212529",
              }}
            >
              <option value={0} onClick={() => setDistritos([])}>
                Selecciona la provincia
              </option>
              {provincias.map((provi, key) => (
                <option
                  key={key}
                  onClick={() => getDistric(provi.id)}
                  value={key + 1}
                >
                  {" "}
                  {provi.name}{" "}
                </option>
              ))}
            </select>
          </div>
        </Form.Group>
      </div>
      <div>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ marginLeft: "440px" }}
        >
          <Form.Label>Distrito</Form.Label>
          <div>
            <select
              id="distritoId"
              name="distritoId"
              style={{
                borderRadius: "0px",
                boxShadow:
                  "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
                width: "410px",
                backgroundColor: "white",
                border: "1px solid #ced4da",
                padding: ".375rem .75rem",
                fontSize: "1rem",
                fontWeight: "1.5",
                appearance: "none",
                transition:
                  "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                lineHeight: "1.5",
                color: "#212529",
              }}
            >
              <option value={0}>Selecciona el distrito</option>
              {distritos.map((dist, key) => (
                <option key={key} value={key + 1}>
                  {" "}
                  {dist.name}{" "}
                </option>
              ))}
            </select>
          </div>
        </Form.Group>
      </div>
      <div>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ marginLeft: "440px" }}
        >
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            id="direccionId"
            type="text"
            placeholder="Dirección"
            style={{
              borderRadius: "0px",
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
              width: "410px",
            }}
            name="user"
            pattern="[A-Za-z-1-9- -]{1,45}"
            title="Solo pueden ir letras"
            className="tituloForm"
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ marginLeft: "440px" }}
        >
          <Form.Label>Comprobante de pago</Form.Label>
          <div>
            <select
              id="comprobanteId"
              name="tipoPago"
              style={{
                borderRadius: "0px",
                boxShadow:
                  "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
                width: "410px",
                backgroundColor: "white",
                border: "1px solid #ced4da",
                padding: ".375rem .75rem",
                fontSize: "1rem",
                fontWeight: "1.5",
                appearance: "none",
                transition:
                  "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                lineHeight: "1.5",
                color: "#212529",
              }}
            >
              <option value="0">Selecciona el tipo de pago</option>
              <option value="1">Boleta</option>
              <option value="2">Factura</option>
            </select>
          </div>
        </Form.Group>
      </div>
      <div style={{ marginLeft: "440px" }}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Telefono de referencia</Form.Label>
          <Form.Control
            id="telefoID"
            type="number"
            placeholder="Telefono de referencia"
            style={{
              borderRadius: "0px",
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
              width: "410px",
            }}
            name="user"
            pattern="[1-9]{9,9}"
            title="Solo pueden ir letras"
            className="tituloForm"
          />
        </Form.Group>
      </div>
      <div style={{ marginLeft: "480px", marginBottom: "15px" }}>
        <p style={{ position: "absolute", marginLeft: "-35px" }}>
          {" "}
          Metodo de envío:{" "}
        </p>
        {["radio"].map((type) => (
          <div
            key={`inline-${type}`}
            className="mb-3"
            style={{ marginLeft: "120px" }}
          >
            <Form.Check
              inline
              label="Recojer en tienda"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              label="Envío a domicilio"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
              onClick={() => setActive(true)}
              defaultChecked
            />
          </div>
        ))}
      </div>

      <div>
        <Elements stripe={stripePromise}>
          <div>
            <div className="row">
              <div className="col-md-4 offset-md-4">
                {" "}
                <CheckForm />
              </div>
            </div>
          </div>
        </Elements>
      </div>
      <div
        style={{
          position: "absolute",
          left: "1250px",
          width: "180px",
          top: "150px",
        }}
      >
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
            <span style={{ color: "#10100", fontSize: "15px" }}>S/</span>{" "}
            {subTotal.toFixed(2)}
          </p>
          <div style={{ marginTop: "-10px" }}></div>
        </div>
      </div>
    </div>
  );
}
