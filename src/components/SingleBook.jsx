import React from "react";
import Card from "react-bootstrap/Card";

const SingleBook = (props) => {
  return (
    <Card
      style={
        props.selected
          ? {
              border: "solid red",
            }
          : {}
      }
      bg="dark"
      className="mb-4 book"
    >
      <Card.Img
        variant="top"
        src={props.book.img}
        onClick={(e) => {
          props.setSelected(props.book.asin);
        }}
      />
    </Card>
  );
};

export default SingleBook;
