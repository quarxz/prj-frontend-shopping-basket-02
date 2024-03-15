import styles from "./Basket.module.css";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { ProductBasketItem } from "./ProductBasketItem";
import axios from "axios";

export function Basket() {
  const location = useLocation();

  const { user, url } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);

  const [price, setPrice] = useState(0);

  let arr = [];
  let x = 0;

  useEffect(() => {
    async function loadProducts() {
      console.log("Load Data");
      try {
        setIsLoading(true);
        if (url) {
          const response = await axios.post(`${url}/user/${user.id}`);
          console.log(response.data.products);
          console.log(response.status);
          setProducts(response.data.products);
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
  }, [location]);

  async function onSetPrice(price, quantity) {
    const productgesamtpreis = price * quantity;
    arr.push(productgesamtpreis);
    let sum = arr.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    // productgesamtpreis !== undefined
    //   ? user.promotion
    //     ? setPrice(sum - (sum / 100) * 10)
    //     : setPrice(sum)
    //   : undefined;
    productgesamtpreis !== undefined ? setPrice(sum) : undefined;
  }

  return (
    <>
      <h2>The Shopping Basket!</h2>
      {products.length === 0 ? (
        <p>Keine Producte im Warenkorb</p>
      ) : isloading ? (
        <span className="loader"></span>
      ) : (
        products.map((product) => {
          return (
            <ProductBasketItem
              key={product.productId}
              product={product}
              onGetPrice={(price, quantity) => {
                if (price !== undefined) {
                  onSetPrice(price, quantity);
                }
              }}
            />
          );
        })
      )}
      {console.log(user.promotion)}
      {user.promotion ? <p>Original Price: {price.toFixed(2)} €</p> : ""}
      {user.promotion ? <p>Promotion Rabatt 10%: {((price / 100) * 10).toFixed(2)} €</p> : ""}
      {user.promotion ? (
        <p>Your Price with 10% Rabatt: {(price - (price / 100) * 10).toFixed(2)} €</p>
      ) : (
        ""
      )}
      {user.promotion ? (
        <p>
          <b>Warenkorb Gesamtpreis: {(price - (price / 100) * 10).toFixed(2)} €</b>
        </p>
      ) : (
        <p>
          <b>Warenkorb Gesamtpreis: {price} €</b>
        </p>
      )}
    </>
  );
}
