import { useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    async function loadProducts() {
      console.log("Load Data");
      try {
        setIsLoading(true);
        const response = await axios.get(`${url}/product/${id}`);
        console.log(response.data);
        console.log(response.status);
        setProduct(response.data);
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
      <h1>Product Details</h1>
      <p>This is the product detail page for id: {id}</p>

      {isloading ? <span className="loader"></span> : <ProductDetailItem product={product} />}
      <NavLink onClick={() => navigate(-1)}>Back</NavLink>
    </>
  );
}
