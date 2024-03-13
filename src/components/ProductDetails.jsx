import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

import { ProductItem } from "./ProductItem";
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

  async function handleAddProductToBasket(e) {
    try {
      const response = await axios.post(
        `${url}/user/${user.id}/buy`,
        {
          productId: e.target.value,
          quantity: 2,
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
      console.log(err);
      console.log(err.response.data.message);
    }
  }

  return (
    <>
      <h1>Product Details</h1>
      <p>This is the product detail page for id: {id}</p>

      {isloading ? (
        <span className="loader"></span>
      ) : (
        <section>
          <h2>{product.title}</h2>
          {/* <h4>{product.category.name}</h4> */}
          <p>{product.id}</p>
          <p>{product.description}</p>
          <button value={product.id} type="text" onClick={handleAddProductToBasket}>
            Add to Shopping-Basket
          </button>
        </section>
      )}
      <NavLink onClick={() => navigate(-1)}>Back</NavLink>
    </>
  );
}
