import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { Button, ListGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import products from "../products";

export default function AddToCartButton() {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const product = products.find((item) => item.id === id);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    navigate(`/cart`);
  };

  return (
    <ListGroup.Item>
      <Button
        onClick={addToCartHandler}
        className="btn btn-dark d-block w-100"
        type="button"
        disabled={product.countInStock === 0}
      >
        Add to cart
      </Button>
    </ListGroup.Item>
  );
}
