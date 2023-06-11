import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  FormControl,
  Form,
} from "react-bootstrap";
import { listProductDetails } from "../redux/actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { addToCart } from "../redux/actions/cartActions";
import { createProductReview } from "../redux/actions/productActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let params = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (error) {
      navigate("/");
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id, successProductReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(params.id, qty));
    navigate(`/cart`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(params.id, { rating, comment }));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        product && (
          <>
            <Link className="btn btn-light my-3" to="/">
              Go back
            </Link>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={6}>
                <Card className="product-details-card">
                  <Card.Body>
                    <Card.Title as="h2">{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} Reviews`}
                      />
                    </Card.Subtitle>
                    <Card.Text as="h3">${product.price}</Card.Text>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                </Card>
                <Card className="mt-3 product-stock-card">
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0
                              ? `In Stock`
                              : `Out of Stock`}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty:</Col>
                            <Col>
                              <FormControl
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </FormControl>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-dark w-100"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add to Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <h2 className="mb-3">Customer Reviews</h2>
                {loadingProductReview && <Loading />}
                {product.reviews.length === 0 ? (
                  <Message variant="info">No Reviews</Message>
                ) : (
                  <ListGroup variant="flush">
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} text="" />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
                <h3 className="mt-4 mb-3">Write a Customer Review</h3>
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">⭐ - Poor</option>
                        <option value="2">⭐⭐ - Fair</option>
                        <option value="3">⭐⭐⭐ - Good</option>
                        <option value="4">⭐⭐⭐⭐ - Very Good</option>
                        <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review..."
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      type="submit"
                      className="btn-dark"
                      variant="primary"
                    >
                      Submit Review
                    </Button>
                  </Form>
                ) : (
                  <Message variant="info">
                    Please <Link to="/login">sign in</Link> to write a review.
                  </Message>
                )}
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default ProductScreen;
