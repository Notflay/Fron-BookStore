import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Formfiltro = ({
  changefilt,
  total,
  datoComplete,
  getauthorForl,
  dato,
  authors,
  active,
  changeActive,
  changeFiltro,
  filtros,
  changeRango,
  bookYear,
  changeRating,
  filtrados,
  resetPage,
}) => {
  const [title, setTitle] = useState();

  const searchF = (e) => {
    e.preventDefault();
    if (title !== undefined) {
      changefilt(title);
      setTitle(undefined);
    } else if (filtros) {
      changefilt(filtros);
    }
  };

  function doubleFunction(e) {
    datoComplete(e);
    getauthorForl(dato);
  }

  function doubleFuSearch(e) {
    try {
      changeFiltro(e);
      document.querySelectorAll(".idAuthor")[0].value = e.target.innerHTML;
    } catch {}
  }

  function authorSearch() {
    try {
      return authors.map((author, key) => {
        return (
          <li
            key={key}
            style={{
              position: "relative",
              listStyle: "none",
              padding: "0px",

              cursor: "pointer",
              boxSizing: "border-box",
              fontFamily: "Roboto,Helvetica Neue,sans-serif",
              fontWeight: "300",
              fontSize: "1rem",
              lineHeight: "1.5",
              color: "#212529",
              textAlign: "left",
            }}
            className="listaPro"
            onClick={(e) => doubleFuSearch(e)}
          >
            {author}
          </li>
        );
      });
    } catch (error) {
      return (
        <li
          style={{
            position: "relative",
            listStyle: "none",
            padding: "0px",
            margin: "0px",
            cursor: "pointer",
            boxSizing: "border-box",
            fontFamily: "Roboto,Helvetica Neue,sans-serif",
            fontWeight: "300",
            fontSize: "1rem",
            lineHeight: "1.5",
            color: "#212529",
            textAlign: "left",
          }}
        >
          No hay resultados
        </li>
      );
    }
  }

  return (
    <>
      <p
        style={{
          position: "absolute",
          marginTop: "-65px",
          marginLeft: "10px",
          color: "blue",
        }}
      >
        {filtrados ? "filtros aplicados" : null}{" "}
        {filtrados
          ? filtrados.mayor
            ? `precio: ${filtrados.menor} - ${filtrados.mayor} `
            : ` ${filtrados}`
          : null}
      </p>{" "}
      <Form style={{ padding: "10px" }} onSubmit={searchF}>
        <Form.Group
          className="mb-3"
          controlId="formBasicText"
          style={{ width: "100%" }}
        >
          <Form.Label onClick={() => changeActive(false)}>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese título"
            style={{
              borderRadius: "0px",
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
              width: "259px",
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onClick={() => changeActive(false)}
            name="user"
            pattern="[A-Za-z]{1,25}"
            title="Solo pueden ir letras"
            className="tituloForm"
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ width: "100%" }}
        >
          <Form.Label onClick={() => changeActive(false)}>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Seleccione Author"
            style={{
              borderRadius: "0px",
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
              width: "259px",
            }}
            onChange={(e) => {
              doubleFunction(e);
            }}
            onClick={() => changeActive(true)}
            className="idAuthor"
          />
          {active ? (
            <div
              style={{
                position: "absolute",
                width: "258px",
                background: "#fff",
                height: "auto",
                boxShadow: "0 2px 5px rgba(0,0,0,.25)",
                boxSizing: "border-box",
                fontFamily: "Roboto,Helvetica Neue,sans-serif",
                fontWeight: "300",
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
                {authors ? authorSearch() : null}
              </ul>
            </div>
          ) : null}
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formbasicPrecio"
          style={{ width: "100%" }}
        >
          <Form.Label onClick={() => changeActive(false)}>Precio</Form.Label>
          <div>
            <select
              id="precio"
              name="precio"
              style={{
                borderRadius: "0px",
                boxShadow:
                  "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
                width: "259px",
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
              <option onClick={resetPage}>Selecciona el rango</option>
              <option
                value='{"menor":0, "mayor":20}'
                onClick={(e) => changeRango(JSON.parse(e.target.value))}
              >
                0 - 20
              </option>
              <option
                value='{"menor":20, "mayor":40}'
                onClick={(e) => changeRango(JSON.parse(e.target.value))}
              >
                20 - 40
              </option>
              <option
                value='{"menor":40, "mayor":60}'
                onClick={(e) => changeRango(JSON.parse(e.target.value))}
              >
                40 - 60
              </option>
              <option
                value='{"menor":60, "mayor":80}'
                onClick={(e) => changeRango(JSON.parse(e.target.value))}
              >
                60 - 80
              </option>
              <option
                value='{"menor":80, "mayor":100}'
                onClick={(e) => changeRango(JSON.parse(e.target.value))}
              >
                80 - 100
              </option>
              <option
                value='{"menor":100, "mayor":500}'
                onClick={(e) => changeRango(JSON.parse(e.target.value))}
              >
                {"> 100"}
              </option>
            </select>
          </div>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ width: "100%" }}
        >
          <Form.Label onClick={() => changeActive(false)}>
            Selecciona por rating
          </Form.Label>
          <div>
            <select
              id="precio"
              name="precio"
              style={{
                borderRadius: "0px",
                boxShadow:
                  "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
                width: "259px",
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
              <option onClick={resetPage}>Selecciona el rating</option>
              <option value="0" onClick={(e) => changeRating(e.target.value)}>
                0
              </option>
              <option value="1" onClick={(e) => changeRating(e.target.value)}>
                1
              </option>
              <option value="2" onClick={(e) => changeRating(e.target.value)}>
                2
              </option>
              <option value="3" onClick={(e) => changeRating(e.target.value)}>
                3
              </option>
              <option value="4" onClick={(e) => changeRating(e.target.value)}>
                4
              </option>
              <option value="5" onClick={(e) => changeRating(e.target.value)}>
                5
              </option>
            </select>
          </div>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formbasicAño"
          style={{ width: "100%" }}
        >
          <Form.Label onClick={() => changeActive(false)}>Año</Form.Label>
          <div>
            <select
              id="Año"
              name="Año"
              style={{
                borderRadius: "0px",
                boxShadow:
                  "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
                width: "259px",
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
              <option>Selecciona el año de publicación</option>
              <option
                value="2001"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2001
              </option>
              <option
                value="2002"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2002
              </option>
              <option
                value="2005"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2005
              </option>
              <option
                value="2006"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2006
              </option>
              <option
                value="2007"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2007
              </option>
              <option
                value="2008"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2008
              </option>
              <option
                value="2009"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2009
              </option>
              <option
                value="2010"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2010
              </option>
              <option
                value="2011"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2011
              </option>
              <option
                value="2012"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2012
              </option>
              <option
                value="2013"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2013
              </option>
              <option
                value="2014"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2014
              </option>
              <option
                value="2015"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2015
              </option>
              <option
                value="2016"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2016
              </option>
              <option
                value="2017"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2017
              </option>
              <option
                value="2018"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2018
              </option>
              <option
                value="2019"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2019
              </option>
              <option
                value="2020"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2020
              </option>
              <option
                value="2021"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2021
              </option>
              <option
                value="2022"
                onClick={(e) => {
                  bookYear(e.target.value);
                }}
              >
                2022
              </option>
            </select>
          </div>
        </Form.Group>
        <div className="d-grid gap-2" onClick={() => changeActive(false)}>
          <Button
            variant="warning"
            size="lg"
            type="submit"
            style={{
              borderRadius: "0px",
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)",
              width: "100%",
              color: "white",
            }}
          >
            Filtrar
          </Button>
        </div>
        <div>
          <p style={{ color: "red", fontWeight: "bold" }}>
            {total}s encontrados
          </p>
        </div>
      </Form>
    </>
  );
};

export default Formfiltro;
