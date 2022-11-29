import React from "react";
import { Form, Col } from "react-bootstrap";
import { useState } from "react";
let uri = `https://striveschool-api.herokuapp.com/api/comments/`;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZmE4MWQ0YmUzZDAwMTU4NDYwMjYiLCJpYXQiOjE2Njk3MjcyMTIsImV4cCI6MTY3MDkzNjgxMn0.T7mbp-neLd29rJxU-ZLkbkwQbiKw1OzL14pL6NfGx4k`;
const opts = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const AddComment = (props) => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        let response = await fetch(uri, {
          headers: {
            ...opts.headers,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            comment: text,
            rate: rating,
            elementId: props.asin,
          }),
        });

        if (response.ok) {
          props.fetchComments(props.asin);
          setText("");
          setRating(1);
        } else {
          console.log("Error posting comment");
        }
      }}
    >
      <Form.Row className="mt-5">
        <Form.Group as={Col} xs={12} controlId="formGridComment">
          <Form.Label>Add Comments: </Form.Label>
          <Form.Control
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-5" as={Col} controlId="formGridRating">
          <Form.Label>Add Rating: </Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose..."
            onChange={(e) => {
              setRating(e.target.value);
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <button className="mb-5" type="submit">
        Submit
      </button>
    </Form>
  );
};

export default AddComment;
