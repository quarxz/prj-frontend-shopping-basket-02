import styles from "./ProductBasketItem.module.css";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";

export function ProductBasketItem({ product }) {
  const location = useLocation();

  const { url, user } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);

  async function handleDeleteBasketItem(e) {
    console.log("delete");
    console.log(product);
    console.log(products);
    console.log(user.id);

    // const productId = e.target.value;
    try {
      setIsLoading(true);
      console.log(quantity);
      const response = await axios.post(
        `${url}/user/${user.id}/delete`,
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
      console.log(response.data.message);
    } catch (err) {
      setIsError(true);
      console.log(err);
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadProducts() {
      console.log("Load Data");

      try {
        setIsLoading(true);
        if (url) {
          const response = await axios.get(`${url}/product/${product.productId}`);
          // console.log(response.data);
          // console.log(response.status);
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (isError) {
    return (
      <>
        <h1>Componet Livecycle</h1>
        <p>oops - an error appeared!</p>
      </>
    );
  }

  function count() {
    setQuantity((prevQuant) => prevQuant + 1);
    console.log(quantity);
  }

  return (
    <section className={styles.basketItem}>
      <h3>{products.title}</h3>
      <ul>
        <li>productId: {products.id}</li>
        <li>quantity: {product.quantity}</li>
        <li>price: {products.price}</li>
      </ul>
      <button type="text" value={products.id} onClick={handleDeleteBasketItem}>
        {quantity != product.quantity ? "update" : "delete"}
      </button>

      <button
        type="text"
        onClick={() => {
          quantity > 1 && setQuantity((prevQuant) => prevQuant - 1);
        }}
      >
        -
      </button>
      <input type="number" name="quantity" value={quantity} onChange={(e) => e.target.value} />
      <button
        type="text"
        onClick={() => {
          quantity < product.quantity && setQuantity((prevQuant) => prevQuant + 1);
        }}
      >
        +
      </button>
    </section>
  );
}
