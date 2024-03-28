import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../context/UserContext";

import { ProductDetailItem } from "./ProductDetailItem";
import axios from "axios";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";

export function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user, url } = useContext(UserContext);

  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [product, setProduct] = useState([]);

  const loadProducts = useCallback(async () => {
    // async function loadProducts() {
    console.log("Load Data");
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}/products/${id}`);
      console.log(response.data);
      console.log(response.status);
      setProduct(response.data);
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [url, user.id]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

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
      <h1>Product Details</h1>
      <p>This is the product detail page for id: {id}</p>

      {isloading ? (
        <span className="loader"></span>
      ) : (
        <ProductDetailItem
          product={product}
          onUpdateItem={() => {
            loadProducts();
          }}
        />
      )}
      <NavLink onClick={() => navigate(-1)}>Back</NavLink>
    </>
  );
}
