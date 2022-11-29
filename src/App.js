import "./App.css";

import { Row, Col } from "react-bootstrap";
import CommentArea from "./components/CommentArea";
import BookList from "./components/BookList";
import books from "./fantasy.json";
import { useState } from "react";

const App = (props) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <h1 className="ml-4">Library of Fantasy books</h1>
      <Row>
        <Col>
          <BookList
            selected={selected}
            books={books}
            setSelected={setSelected}
          />
        </Col>
        {selected && (
          <Col md={4} className="mx-3">
            <CommentArea book={selected} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default App;
