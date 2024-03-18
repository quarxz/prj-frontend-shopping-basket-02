import styles from "./ProductBasketItem.module.css";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";

export function ProductBasketItem({ productDataFromUser, getPrice, getUpdatedProductFormUser }) {
  const location = useLocation();

  const { url, user } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [productData, setProductData] = useState([]);

  const [quantityToDelete, setQuantityToDelete] = useState(1);

  const [updatedQuantity, setUpdatedQuantity] = useState(() => {
    const newQuantity = localStorage.getItem("quantity");
    if (newQuantity) {
      return JSON.parse(newQuantity);
    } else {
      return 0;
    }
  });

  const [test, setTest] = useState(0);

  async function handleDeleteBasketItem(e) {
    console.log("delete");
    console.log(productDataFromUser);
    console.log(productData);
    console.log(user.id);

    setTest((prevt) => (prevt += 1));

    try {
      setIsLoading(true);
      console.log("Hallo aus Delete Basket Item");
      const response = await axios.post(
        `${url}/user/${user.id}/delete`,
        {
          productId: e.target.value,
          quantity: Number(quantityToDelete),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      console.log(response.status);

      console.log(productData.id);
      console.log(response.data.products);

      response.data.products.map((product) => {
        if (product.productId === productData.id) {
          console.log(product.quantity);
          // localStorage.setItem("quantity", JSON.stringify(product.quantity));
        }
      });

      console.log(response.message);
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadProduct() {
      console.log("Load Product Data in Basket Item");
      try {
        setIsLoading(true);
        if (url) {
          const response = await axios.get(`${url}/product/${productDataFromUser.productId}`);
          console.log(response.data);
          console.log(response.status);
          setProductData(response.data);

          // console.log("Hallo aus Load Product");
          // const res02 = await axios.post(`${url}/user/${user.id}`);
          // console.log(res02.data.products);
          // setUpdatedQuantity(res02.data.products);
          // console.log(updatedQuantity);
        } else {
          setProductData([]);
        }
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [test]);

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
      <h3>{productData.title}</h3>
      <ul>
        <li>productId: {productData.id}</li>
        <li>quantity: {productDataFromUser.quantity} Stück</li>
        {/* <li>quantity: {updatedQuantity} Stück</li> */}
        <li>price: {productData.price} €</li>
        <li>gesamtpreis: {productData.price * productDataFromUser.quantity} €</li>
      </ul>
      {getPrice(productData.price, productDataFromUser.quantity)}

      <button
        type="text"
        onClick={() => {
          quantityToDelete > 1 && setQuantityToDelete((prevQuant) => prevQuant - 1);
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
          quantityToDelete < productDataFromUser.quantity &&
            setQuantityToDelete((prevQuant) => prevQuant + 1);
        }}
      >
        +
      </button>
      <button
        type="text"
        value={productData.id}
        onClick={(e) => {
          handleDeleteBasketItem(e);
          getUpdatedProductFormUser();
        }}
      >
        {quantityToDelete != productDataFromUser.quantity
          ? `delete (${quantityToDelete})`
          : "delete complete"}
      </button>
    </section>
  );
}
