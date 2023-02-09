import React, { useState } from "react";
import { controlStock } from "../../../utils/controlls";

const DetailsBook = ({
  title,
  subtitle,
  description,
  author,
  publisher,
  year,
  pages,
  rating,
  aumentarPrecio,
}) => {
  const [alert, setAlert] = useState(false);

  return (
    <div>
      <div style={{ padding: "5px", marginTop: "15px" }}>
        <span
          style={{
            fontSize: "170%",
            fontFamily: "Roboto,Helvetica Neue,sans-serif",
            boxSizing: "border-box",
            fontWeight: "700",
            lineHeight: "1.5",
            textAlign: "left",
          }}
        >
          {title}
        </span>
      </div>
      <div>{subtitle}</div>
      <div>{description}</div>
      <div style={{ padding: "10px" }}>
        <ul>
          <li>
            <span style={{ fontWeight: "bold" }}>Author:</span> {author}
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Publisher:</span> {publisher}
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Year:</span> {year}
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Pages:</span> {pages}
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Rating:</span> {rating}
          </li>
        </ul>
      </div>
      <div>
        <p>Cantidad:</p>
        <input
          defaultValue={1}
          type={"number"}
          min="1"
          max={"10"}
          onChange={(e) => {
            if (controlStock(e) === true) {
              setAlert(true);
            } else {
              setAlert(false);
            }
            aumentarPrecio(e.target.value);
          }}
        ></input>
        {alert ? (
          <p style={{ color: "red", marginTop: "-5px", fontWeight: "bold" }}>
            solo se permite del 1 al 10
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default DetailsBook;
