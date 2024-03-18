import styles from "./Products.module.css";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { ProductItem } from "./ProductItem";
import axios from "axios";

export function Products() {
  const location = useLocation();

  const { url } = useContext(UserContext);

  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      console.log("Load Data");
      try {
        setIsLoading(true);
        if (url) {
          const response = await axios.get(`${url}/products`);
          console.log(response.data);
          console.log(response.status);
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
  }, [location]);

  if (isError) {
    return (
      <>
        <h1>Componet Livecycle</h1>
        <p>oops - an error appeared!</p>
      </>
    );
  }

  return (
    <>
      <h1>Products</h1>
      <p>This is the products page</p>

      {isloading ? <span className="loader"></span> : <ProductItem products={products} />}
    </>
  );
}
