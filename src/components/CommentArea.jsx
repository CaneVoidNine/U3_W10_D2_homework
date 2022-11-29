import React from "react";
import { ListGroup, Spinner, Alert } from "react-bootstrap";
import SingleComment from "./SingleComment";
import AddComment from "./AddComment";
import { useState, useRef, useEffect } from "react";
let uri = `https://striveschool-api.herokuapp.com/api/comments/`;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZmE4MWQ0YmUzZDAwMTU4NDYwMjYiLCJpYXQiOjE2Njk3MjcyMTIsImV4cCI6MTY3MDkzNjgxMn0.T7mbp-neLd29rJxU-ZLkbkwQbiKw1OzL14pL6NfGx4k`;
const opts = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const prevBook = usePrevious(props.book);

  const fetchComments = async () => {
    setIsLoading(true);
    if (props.book) {
      try {
        let response = await fetch(uri + props.book, opts);

        if (response.ok) {
          let data = await response.json();

          setIsLoading(false);
          setComments(data);
        } else {
          setIsLoading(false);
          setError("Error fetching comments");
        }
      } catch (e) {
        setIsLoading(false);
        setError(JSON.stringify(e));
      }
    } else {
      setIsLoading(false);
      setError("No book selected");
    }
  };

  useEffect(() => {
    //componentDidMount
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //componentDidUpdate
    if (prevBook !== props.book) {
      fetchComments();
    }
  });

  return (
    <>
      {isLoading && <Spinner animation="grow" />}

      {!isLoading && !error && (
        <>
          <AddComment fetchComments={fetchComments} asin={props.book} />
          <p>Comments</p>
          <ListGroup variant="flush">
            {comments.length ? (
              comments.map((comment, i) => <SingleComment comment={comment} />)
            ) : (
              <p>No comments found</p>
            )}
          </ListGroup>
        </>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
};

export default CommentArea;
