import React from "react";
import Button from "react-bootstrap/Button";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";

const PriceBook = ({ price, incrementarVenta }) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#f3f2f2",
          width: "255px",
          height: "455px",
        }}
      >
        <div
          style={{
            color: "#ffae00",
            textAlign: "center",
            fontSize: "2.3rem",
            paddingTop: "20px",
          }}
        >
          <p>S/ {price.toFixed(2)}</p>
        </div>
        <div className="mb-2" style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            size="lg"
            style={{
              backgroundColor: "orange",
              borderColor: "orange",
              borderRadius: "25px",
              fontWeight: "600",
            }}
            onClick={incrementarVenta}
          >
            🛒 Agregar al carrito
          </Button>{" "}
        </div>
        <div
          className="mb-2"
          style={{ textAlign: "center", paddingTop: "35px" }}
        >
          <Button
            variant="primary"
            size="lg"
            style={{
              backgroundColor: "#f3f2f2",
              borderColor: "orange",
              borderRadius: "25px",
              fontWeight: "600",
              width: "226px",
              color: "orange",
            }}
          >
            Comprar
          </Button>{" "}
        </div>
        <div style={{ paddingTop: "39px", textAlign: "center" }}>
          <p>Comparte en:</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.facebook.com/ITBook2022">
            <FacebookOutlinedIcon
              style={{ cursor: "pointer", margin: "10px" }}
              fontSize="large"
            ></FacebookOutlinedIcon>
          </a>

          <a href="https://wa.me/936965371">
            <WhatsAppIcon
              style={{ cursor: "pointer", margin: "10px" }}
              fontSize="large"
            ></WhatsAppIcon>
          </a>

          <a href="https://twitter.com/intent/tweet?text=https%3A//twitter.com/ITBookStore">
            <TwitterIcon
              style={{ cursor: "pointer", margin: "10px" }}
              fontSize="large"
            ></TwitterIcon>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PriceBook;
