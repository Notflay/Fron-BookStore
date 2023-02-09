import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import React from "react";
import Copyright from "./copyright";

const Pie = ({ changeShutInit }) => {
  return (
    <div onClick={changeShutInit}>
      <div>
        <div
          style={{
            maxWidth: "1140px",
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "55px",
            marginRight: "auto",
            marginLeft: "auto",
            fontFamily: "Roboto,Helvetica Neue,sans-serif",
            fontWeight: "300",
            marginTop: "40px",
          }}
        >
          <div _ngcontent-bnj-c89="" className="row mb-5">
            <div _ngcontent-bnj-c89="" className="col-sm-3"></div>
            <div _ngcontent-bnj-c89="" className="col-sm-5">
              <p _ngcontent-bnj-c89="" className="font-weight-bold">
                Pagos 100% seguros
                <br _ngcontent-bnj-c89="" />
                <img
                  _ngcontent-bnj-c89=""
                  src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/line_pagos.png"
                  width="35%"
                  alt="data"
                />
              </p>
              <p _ngcontent-bnj-c89="">
                <img
                  _ngcontent-bnj-c89=""
                  src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/p1.png"
                  width="10%"
                  alt="data"
                />
                <img
                  _ngcontent-bnj-c89=""
                  src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/p2.png"
                  width="10%"
                  alt="data"
                />
                <img
                  _ngcontent-bnj-c89=""
                  src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/p3.png"
                  width="15%"
                  alt="data"
                />
                <img
                  _ngcontent-bnj-c89=""
                  src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/p4.png"
                  width="20%"
                  alt="data"
                />
              </p>
            </div>
            <div _ngcontent-bnj-c89="" className="col-sm-4">
              <p _ngcontent-bnj-c89="" className="font-weight-bold">
                Siguenos en:
                <br _ngcontent-bnj-c89="" />
                <img
                  _ngcontent-bnj-c89=""
                  src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/line_siguenos.png"
                  width="28%"
                  alt="data"
                />
              </p>
              <p _ngcontent-bnj-c89="">
                <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.facebook.com/ITBook2022">
                  <FacebookOutlinedIcon
                    style={{ cursor: "pointer" }}
                    fontSize="large"
                  ></FacebookOutlinedIcon>
                </a>
                <a href="https://wa.me/936965371">
                  <WhatsAppIcon
                    style={{ cursor: "pointer" }}
                    fontSize="large"
                  ></WhatsAppIcon>
                </a>
                <a href="https://twitter.com/intent/tweet?text=https%3A//twitter.com/ITBookStore">
                  <TwitterIcon
                    style={{ cursor: "pointer" }}
                    fontSize="large"
                  ></TwitterIcon>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="page-footer" style={{ height: "212px" }}>
        <div _ngcontent-bnj-c97="" className="row" style={{ height: "212px" }}>
          <div
            _ngcontent-bnj-c97=""
            className="col-md-2 mt-md-0 mt-3 mb-3"
            style={{ marginLeft: "200px", height: "212px" }}
          >
            <p _ngcontent-bnj-c97="" className="mt-2">
              <img
                _ngcontent-bnj-c97=""
                src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/Libreria-virtual-Logo.png"
                width="80%"
                alt="data"
                style={{
                  width: "128px",
                  marginLeft: "250px",
                  marginTop: "30px",
                }}
              />
            </p>
            <p _ngcontent-bnj-c97="">
              <br _ngcontent-bnj-c97="" />
            </p>
          </div>
          <div
            _ngcontent-bnj-c97=""
            className="col-md-1 mt-md-0 mt-3 mb-3"
          ></div>
          <div
            _ngcontent-bnj-c97=""
            className="col-md-4 mt-md-0 mt-3 mb-3"
            style={{
              marginTop: "0",
              padding: "20px",
              position: "relative",
              width: "100%",
              paddingRight: "15px",
              paddingLeft: "15px",
              flex: "0 0 33.3333333333%",
              maxWidth: "33.3333333333%",
              marginBottom: "1rem ",
              fontSize: ".9rem",
            }}
          >
            <p
              _ngcontent-bnj-c97=""
              style={{
                marginTop: "0",
                marginBottom: "1rem",
                boxSizing: "border-box",
                textAlign: "left",

                fontFamily: "Roboto,Helvetica Neue,sans-serif",
                fontWeight: "300",
                lineHeight: "1.5",
              }}
            >
              Sistema de información administrado por la
              <br _ngcontent-bnj-c97="" />
              Oficina de Tecnologías de la Información y Estadística
            </p>
            <p _ngcontent-bnj-c97="">
              <LocationOnIcon></LocationOnIcon>
              Av. La Poesía 160, San Borja, Lima, Perú
            </p>
            <p _ngcontent-bnj-c97="">
              <CallIcon></CallIcon>
              936 965 371
            </p>
            <p _ngcontent-bnj-c97="">
              <MailOutlineIcon></MailOutlineIcon>
              libreriaNotflay@bnp.gob.pe
            </p>
          </div>
          <hr _ngcontent-bnj-c97="" className="clearfix w-100 d-md-none pb-3" />
          <div _ngcontent-bnj-c97="" className="col-md-1 mb-md-0 mb-3"></div>
          <div
            _ngcontent-bnj-c97=""
            className="col-md-3 mb-md-0 mb-3"
            style={{ width: "", marginLeft: "-200px" }}
          >
            <p _ngcontent-bnj-c97="" className="mt-2">
              <br _ngcontent-bnj-c97="" />
              <br _ngcontent-bnj-c97="" />
            </p>
            <p _ngcontent-bnj-c97="">
              <img
                _ngcontent-bnj-c97=""
                src="https://libreriavirtual.bnp.gob.pe/assets/image/portafolio/i_cultura.png"
                width="100%"
                alt="data"
                style={{ marginLeft: "-50px", width: "255px" }}
              />
            </p>
          </div>
          <div _ngcontent-bnj-c97="" className="col-md-3 mb-md-0 mb-3"></div>
        </div>
      </footer>
      <Copyright />
    </div>
  );
};

export default Pie;
