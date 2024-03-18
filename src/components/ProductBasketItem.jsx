import styles from "./ProductBasketItem.module.css";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";

export function ProductBasketItem({ product, onUpdateItem }) {
  const { url, user } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [quantityToDelete, setQuantityToDelete] = useState(1);

  async function handleDeleteBasketItem(e) {
    console.log("delete");
    console.log(product);
    console.log(user.id);
    try {
      setIsLoading(true);
      console.log("Hallo aus Delete Basket Item");
      await axios.post(
        `${url}/user/${user.id}/delete`,
        {
          productId: product._id,
          quantity: Number(quantityToDelete),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onUpdateItem();
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isError) {
    return (
      <>
        <h1>Componet Livecycle</h1>
        <p>oops - an error appeared!</p>
      </>
    );
  }

  return (
    <section className={styles.basketItem}>
      <h3>{product.title}</h3>
      <ul>
        <li>productId: {product._id}</li>
        <li>quantity: {product.quantity} Stück</li>
        {/* <li>quantity: {updatedQuantity} Stück</li> */}
        <li>price: {product.price} €</li>
        <li>gesamtpreis: {product.price * product.quantity} €</li>
      </ul>

      <button
        type="text"
        onClick={() => {
          quantityToDelete > 1 &&
            setQuantityToDelete((prevQuant) => prevQuant - 1);
        }}
      >
        -
      </button>
      <input
        type="number"
        name="quantity"
        value={quantityToDelete}
        onChange={(e) => e.target.value}
      />

      <button
        type="text"
        onClick={() => {
          quantityToDelete < product.quantity &&
            setQuantityToDelete((prevQuant) => prevQuant + 1);
        }}
      >
        +
      </button>
      <button
        type="text"
        value={product.id}
        onClick={(e) => {
          handleDeleteBasketItem(e);
          onUpdateItem();
        }}
      >
        {quantityToDelete != product.quantity
          ? `delete (${quantityToDelete})`
          : "delete complete"}
      </button>
      {JSON.stringify(product)}
    </section>
  );
}
