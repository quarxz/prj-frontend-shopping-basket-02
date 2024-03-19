import styles from "./Basket.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { ProductBasketItem } from "./ProductBasketItem";
import axios from "axios";

export function Basket() {
  const location = useLocation();

  const { user, url } = useContext(UserContext);
  console.log(user);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [productsFromUser, setProductsFromUser] = useState([]);
  console.log(productsFromUser);

  const [price, setPrice] = useState(0);

  let arr = Array();

  async function onSetPrice() {
    let sum = arr.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    setPrice(sum);
    console.log(price);
  }

  const loadProducts = useCallback(async () => {
    console.log("Load Data");
    try {
      setIsLoading(true);
      if (url) {
        const response = await axios.post(`${url}/user/${user.id}`);

        console.log(response.data.products);
        console.log(response.status);
        const { products } = response.data;
        setProductsFromUser(products);

        response.data.products?.length && setPrice(0);

        response.data.products.map((product) => {
          const price = product.product.price;
          const quantity = product.quantity;
          const productgesamtpreis = price * quantity;
          arr.push(productgesamtpreis);
        });
        onSetPrice();

        console.log("Hello from Load Products in Basket!");
      } else {
        setProductsFromUser([]);
      }
    } catch (err) {
      setIsError(true);
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [url, user.id]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <h2>The Shopping Basket!</h2>
      {productsFromUser.length === 0 ? (
        <p>Keine Producte im Warenkorb</p>
      ) : isloading ? (
        <span className="loader"></span>
      ) : (
        productsFromUser.map((productDataFromUser) => {
          return (
            <ProductBasketItem
              key={productDataFromUser.product._id}
              product={{
                ...productDataFromUser.product,
                quantity: productDataFromUser.quantity,
              }}
              // getPrice={(price, quantity) => {
              //   if (price !== undefined) {
              //     onSetPrice(price, quantity);
              //   }
              // }}
              onUpdateItem={() => {
                loadProducts();
              }}

              // getUpdatedProductFormUser={() => {
              //   console.log("Update Product Data after delete");
              //   setTest((prevt) => (prevt += 1));
              // }}
            />
          );
        })
      )}
      {}
      {user && productsFromUser.length !== 0 ? (
        user.promotion ? (
          <p>Original price: {price.toFixed(2)} €</p>
        ) : (
          ""
        )
      ) : undefined}
      {user && productsFromUser.length !== 0 ? (
        user.promotion ? (
          <p>Promotion Discount 10%: {((price / 100) * 10).toFixed(2)} €</p>
        ) : (
          ""
        )
      ) : undefined}
      {user && productsFromUser.length !== 0 ? (
        user.promotion ? (
          <p>Your Price with 10% Rabatt: {(price - (price / 100) * 10).toFixed(2)} €</p>
        ) : (
          ""
        )
      ) : undefined}
      {user && productsFromUser.length !== 0 ? (
        user.promotion ? (
          <p>
            <b>Your total price: {(price - (price / 100) * 10).toFixed(2)} €</b>
          </p>
        ) : (
          <p>
            <b>Your total price: {price} €</b>
          </p>
        )
      ) : undefined}
    </>
  );
}
