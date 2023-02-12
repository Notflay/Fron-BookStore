import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Catalogo from "./content/Catalogo";
import Formfiltro from "./content/Formfiltro";

import {
  getAuthor,
  getBookForAuthorUnique,
  getBookForPrice,
  getBooksAllDB,
  getBooksForTtile,
  getBookYear,
  getForRating,
} from "../services/axios.service";
import React, { useEffect, useState } from "react";
import Paginator from "./content/components/ButtonsGroups";

const Content = ({ changeActiveNav, changeShutInit }) => {
  const [books, setBooks] = useState([]);

  const [total, setTotal] = useState();
  const [booksPage, setBooksPage] = useState();
  const [booksAll, setBooksAll] = useState([]);

  const [dato, setDato] = useState();
  const [authors, setAuthors] = useState([]);
  const [active, setActive] = useState(false);

  const [filtros, setFiltros] = useState();

  const [filtrados, setFiltrados] = useState("");

  function changeFiltrados(text) {
    setFiltrados(text);
  }

  function changeActive(valor) {
    setActive(valor);
  }

  function resetPage() {
    getBooksAll(0, 10, undefined, true);
    document.querySelectorAll(".tituloForm")[0].value = "";
    document.querySelectorAll(".idAuthor")[0].value = "";
    changeFiltrados(undefined);
  }

  function changeRango(object) {
    setFiltrados(object);
    getBookForPrice(object)
      .then((response) => {
        setBooks(response.data);
        getBooksAll(0, 10, response.data);
        setBooksPage(response.data.length / 10);
        setTotal(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changeRating(num) {
    if (typeof parseInt(num) === "number") {
      setFiltrados(`rating: ${num}`);
    }

    getForRating(num)
      .then((response) => {
        setBooks(response.data);
        getBooksAll(0, 10, response.data);
        setBooksPage(response.data.length / 10);
        setTotal(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function bookYear(year) {
    setFiltrados("año: " + year);
    getBookYear(year)
      .then((response) => {
        setBooks(response.data);
        getBooksAll(0, 10, response.data);
        setBooksPage(response.data.length / 10);
        setTotal(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changeFiltro(e) {
    setFiltros(e.target.innerHTML);
  }

  function ordenForPrice(e) {
    if (e === "1") {
      books.sort(function (a, b) {
        if (parseFloat(a.price.slice(1)) > parseFloat(b.price.slice(1))) {
          return 1;
        }
        if (parseFloat(a.price.slice(1)) < parseFloat(b.price.slice(1))) {
          return -1;
        }
        return 0;
      });
    } else if (e === "2") {
      books.sort(function (a, b) {
        if (parseFloat(a.price.slice(1)) < parseFloat(b.price.slice(1))) {
          return 1;
        }
        if (parseFloat(a.price.slice(1)) > parseFloat(b.price.slice(1))) {
          return -1;
        }
        return 0;
      });
    }
    setBooks(books);
    getBooksAll();
  }

  async function changefilt(title) {
    if (filtros) {
      setFiltrados(filtros);
      getBookForAuthorUnique(filtros)
        .then((response) => {
          if (response.data.length >= 1) {
            setBooks(response.data);
            getBooksAll(0, 10, response.data);
            setBooksPage(response.data.length / 10);
            setTotal(response.data.length);
          } else {
            alert(`no hay resultados para esta busqueda`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setFiltrados(title);
      getBooksForTtile(title)
        .then((response) => {
          if (response.data.length >= 1) {
            setBooks(response.data);
            getBooksAll(0, 10, response.data);
            setBooksPage(response.data.length / 10);
            setTotal(response.data.length);
          } else {
            alert(`no hay resultados para esta busqueda`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function getauthorForl(dato) {
    getAuthor(dato)
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function datoComplete(e) {
    if (e.target.value === "") {
      setDato("*");
    } else if (e.target.value === undefined) {
      setDato("*");
    } else {
      setDato(e.target.value);
    }
  }

  function getBooksAll(init = 0, limit = 10, booksTemplate, reinicio) {
    getBooksAllDB()
      .then((response) => {
        let lista = [];
        let i = init;

        if (books.length < 1) {
          setBooks(response.data);
          setTotal(response.data.length);
        }
        if (reinicio === true) {
          setBooks(response.data);
          setTotal(response.data.length);
          setFiltros(undefined);
        }

        if (books.length < 1) {
          do {
            i++;
            lista.push(response.data[i]);
          } while (i < limit);
        } else {
          do {
            if (booksTemplate) {
              if (booksTemplate[i] === undefined) {
                break;
              }
              lista.push(booksTemplate[i]);
            } else if (reinicio === true) {
              if (response.data[i] === undefined) {
                break;
              }
              lista.push(response.data[i]);
            } else {
              if (books[i] === undefined) {
                break;
              }
              lista.push(books[i]);
            }
            i++;
          } while (i < limit);
        }

        setBooksAll(lista);

        if (booksTemplate) {
          setBooksPage(booksTemplate.length / 10);
        } else if (reinicio === true) {
          setBooksPage(response.data.length / 10);
        } else if (books.length > 1) {
          setBooksPage(books.length / 10);
        } else {
          setBooksPage(response.data.length / 10);
        }
      })
      .catch((error) => {
        console.log(error);
        getBooksAll();
      });
  }

  function filtro() {
    return (
      <Formfiltro
        changeFiltrados={changeFiltrados}
        filtrados={filtrados}
        changefilt={changefilt}
        total={total}
        datoComplete={datoComplete}
        getauthorForl={getauthorForl}
        dato={dato}
        authors={authors}
        active={active}
        changeActive={changeActive}
        changeFiltro={changeFiltro}
        filtros={filtros}
        changeRango={changeRango}
        bookYear={bookYear}
        changeRating={changeRating}
        resetPage={resetPage}
      />
    );
  }

  useEffect(() => {
    getBooksAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={changeActiveNav}>
      <img
        src="https://www.top10books.cl/media/wysiwyg/Top10_pedidos_dic.jpg"
        id="portada-img"
        alt="libreria"
        style={{ marginTop: "-16px" }}
        onClick={changeShutInit}
      />
      <Container style={{ marginTop: "50px" }} onClick={changeShutInit}>
        <Row>
          <Col
            md={{ span: 5, offset: 1 }}
            id="col-filt"
            style={{ width: "21.6%", marginTop: "87px" }}
          >
            {filtro()}
          </Col>
          <Col
            md={{ span: 5, offset: 1 }}
            style={{
              width: "69%",
              marginLeft: "0.66%",
            }}
            id="col-cata"
            onClick={() => changeActive(false)}
          >
            {" "}
            <Paginator
              booksPage={booksPage}
              getBooksAll={getBooksAll}
              filtros={filtros}
              ordenForPrice={ordenForPrice}
              books={books}
              changeFiltrados={changeFiltrados}
              resetPage={resetPage}
            />
            <Catalogo booksAll={booksAll} getBooksAll={getBooksAll} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Content;
