import styles from "./ProductBasketItem.module.css";
import { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";

import axios from "axios";

export function ProductBasketItem({ product, onUpdateItem }) {
  const { url, user } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [serverInfo, setServerInfo] = useState("");

  const [quantityToDelete, setQuantityToDelete] = useState(1);

  async function setServerInfoFn(data) {
    setServerInfo((prevServerInfo) => (prevServerInfo = data));
    setTimeout(() => {
      setServerInfo("");
    }, 3000);
  }

  async function onUpdateItemInBasketItem(e) {
    console.log(e.target.value);
    const response = await axios.post(`${url}/users/${user.id}`);

    console.log(response.data);
  }

  async function handleDeleteBasketItem(e) {
    console.log("delete");
    console.log(product);
    console.log(user.id);
    try {
      setIsLoading(true);
      console.log("Hallo aus Delete Basket Item");
      const response = await axios.post(
        `${url}/users/${user.id}/delete`,
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
      console.log(response.data.message);
      console.log(response.data.basket_total);
      setServerInfoFn(response.data.message);
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
        <li>price: {product.price} €</li>
        <li>gesamtpreis: {product.product_total} €</li>
      </ul>

      <div>
        <button
          type="text"
          onClick={() => {
            quantityToDelete > 1 && setQuantityToDelete((prevQuant) => prevQuant - 1);
          }}
        >
          -
        </button>
        <input
          type="text"
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
      </div>
      <button
        type="text"
        value={product.id}
        onClick={(e) => {
          handleDeleteBasketItem(e);
          onUpdateItem();

          onUpdateItemInBasketItem(e);
        }}
        className={styles.deleteButton}
      >
        {quantityToDelete != product.quantity ? `delete (${quantityToDelete})` : "delete complete"}
      </button>
      {serverInfo ? <p className={styles["server-info"]}>{serverInfo}</p> : <p></p>}
      {/* {JSON.stringify(product)} */}
    </section>
  );
}
