import styles from "./Basket.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { ProductBasketItem } from "./ProductBasketItem";
import { DiscountPrice } from "./DiscountPrice";
import axios from "axios";

export function Basket() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { VITE_API_URL: url } = import.meta.env;

  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [productsFromUser, setProductsFromUser] = useState([]);

  // const [price, setPrice] = useState(0);
  const [totalPrices, setTotalPrices] = useState([]);

  useEffect(() => {
    !user && navigate("/");
  }, [user, user?.id]);

  const loadProducts = useCallback(async () => {
    console.log("Load Data");
    try {
      setIsLoading(true);
      if (url) {
        const response = await axios.post(`${url}/users/${user.id}`);

        console.log(response.data);
        console.log(response.status);
        const { products } = response.data;
        console.log(products);
        setProductsFromUser(products);
        // setPrice(response.data.basket_total);
        setTotalPrices({
          basket_total: response.data.basket_total.toFixed(2),
          basket_total_discount: response.data.basket_total_discount.toFixed(2),
          basket_total_promotion: response.data.basket_total_promotion.toFixed(2),
        });

        // response.data.products?.length && setPrice(0);

        console.log("Hello from Load Products in Basket!");
      } else {
        setProductsFromUser([]);
      }
    } catch (err) {
      setIsError(true);
      // console.log(err);
    } finally {
      setIsLoading(false);
      console.log("finally");
    }
  }, [url, user?.id]);

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
          {
            console.log(productDataFromUser);
          }
          return (
            <ProductBasketItem
              key={productDataFromUser.product._id}
              product={{
                ...productDataFromUser.product,
                quantity: productDataFromUser.quantity,
                product_total: productDataFromUser.product_total,
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
      {user?.promotion ? <p>Original price: {totalPrices.basket_total} €</p> : undefined}
      {user?.promotion ? (
        <p>Promotion Discount 10%: {totalPrices.basket_total_discount} €</p>
      ) : undefined}
      {user?.promotion ? (
        <p>Your Price with 10% Rabatt: {totalPrices.basket_total_promotion} €</p>
      ) : undefined}
      {user?.promotion ? (
        <p>
          <b>Your total price: {totalPrices.basket_total_promotion} €</b>
        </p>
      ) : (
        <p>
          <b>Your total price: {totalPrices.basket_total} €</b>
        </p>
      )}
    </>
  );
}
