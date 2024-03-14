import styles from "./ProductDetailsItem.module.css";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";

export function ProductDetailItem({ product }) {
  const [quantity, setQuantity] = useState(1);

  const { user, url } = useContext(UserContext);

  async function handleAddProductToBasket(e) {
    console.log(Number(quantity));
    try {
      const response = await axios.post(
        `${url}/user/${user.id}/buy`,
        {
          productId: e.target.value,
          quantity: Number(quantity),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      console.log(response.status);
      console.log(response.message);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
    }
  }
  return (
    <section className={styles.detailItem}>
      <h2>{product.title}</h2>
      {/* <h4>{product.category.name}</h4> */}
      <p>{product.id}</p>
      <p>{product.description}</p>

      <button
        type="text"
        onClick={() => {
          quantity > 1 && setQuantity((prevQuant) => prevQuant - 1);
        }}
      >
        -
      </button>
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.defaultValue)}
      />
      <button
        type="text"
        onClick={() => {
          quantity < 10 && setQuantity((prevQuant) => prevQuant + 1);
        }}
      >
        +
      </button>

      <button value={product.id} type="text" onClick={handleAddProductToBasket}>
        Add to Shopping-Basket
      </button>
    </section>
  );
}
