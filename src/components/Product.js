import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="product-card">
      <Link to={`/product/${product._id}`}>
        <div className="image-container">
          <Card.Img src={product.image} alt={product.name} />
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="h6">{product.name}</Card.Title>
        </Link>
        <div className="rating-container">
          <Rating value={product.rating} text={`${product.rating} Reviews`} />
        </div>
        <div className="price-container">
          <span className="price">${product.price}</span>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
