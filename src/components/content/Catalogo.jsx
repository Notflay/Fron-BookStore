/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const Catalogo = ({ booksAll, getBooksAll }) => {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        border: "1px solid #dee2e6",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      {booksAll.length !== 0 ? (
        <Row xs={1} md={3}>
          {booksAll.map((book, key) => {
            if (book.price !== undefined) {
              return (
                <Col key={key}>
                  <div style={{ textAlign: "center", padding: "30px" }}>
                    <div style={{ padding: "5px", height: "320px" }}>
                      <img
                        src={book.image}
                        style={{
                          width: "120px",
                          height: "150px",
                          boxShadow:
                            "0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19) ",
                          borderRadius: ".25rem ",
                          verticalAlign: "middle",
                          borderStyle: "none",
                          boxSizing: "border-box",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(`book/${book.isbn13}`);
                        }}
                      />
                      <div
                        style={{
                          textAlign: "left",
                          marginLeft: "30px",
                          paddingTop: "15px",
                        }}
                      >
                        <span
                          style={{
                            color: "#040958",
                            fontSize: "1rem",
                            fontWeight: "600",
                            textDecoration: "none",
                            display: "block",
                          }}
                        >
                          {book.title}
                        </span>
                        <span
                          style={{
                            fontSize: ".8rem",
                            overflow: "hidden",
                            whiteSpace: "ellipsis",
                            width: "100%",
                            display: "block",
                          }}
                        >
                          {book.subtitle}
                        </span>
                      </div>
                      <p
                        style={{
                          textAlign: "center",
                          paddingTop: "12px",
                          fontSize: "1.4rem",
                          fontWeight: "600",
                          color: "#ffae00",
                        }}
                      >
                        S/ {book.price.slice(1)}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            } else {
            }
          })}
          <Col></Col>
        </Row>
      ) : (
        getBooksAll()
      )}
    </Container>
  );
};

export default Catalogo;
