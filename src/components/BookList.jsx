import React from "react";
import { Col, Row } from "react-bootstrap";
import SingleBook from "./SingleBook";
import { Form } from "react-bootstrap";
import { useState } from "react";
const BookList = (props) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Form.Control
        className="ml-4 mb-4"
        style={{ width: "27rem" }}
        placeholder="Search books here"
        aria-label="Search"
        name="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <Row md={props.selected ? 3 : 4} className="g-4 mx-2">
        {props.books
          .filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((book, i) => (
            <Col key={book.asin}>
              <SingleBook
                book={book}
                setSelected={props.setSelected}
                selected={props.selected === book.asin}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default BookList;
