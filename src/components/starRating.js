import { useState } from "react";
import { Form } from "react-bootstrap";

const ratings = [
  { value: "", label: "Select ..." },
  { value: "1", label: "⭐ - Poor" },
  { value: "2", label: "⭐⭐ - Fair" },
  { value: "3", label: "⭐⭐⭐ - Good" },
  { value: "4", label: "⭐⭐⭐⭐ - Very good" },
  { value: "5", label: "⭐⭐⭐⭐⭐ - Perfect" },
];

function RatingForm() {
  const [rating, setRating] = useState("");

  return (
    <Form.Control
      as="select"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
    >
      {ratings.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Control>
  );
}

export default RatingForm;
