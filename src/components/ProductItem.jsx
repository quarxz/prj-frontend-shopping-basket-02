import styles from "./ProductItem.module.css";
import { useContext } from "react";

import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export function ProductItem({ products, category }) {
  const { user, url } = useContext(UserContext);

  console.log(category);
  return (
    // <section className={styles[product.category.toLowerCase().replace(/ & /g, "")]}>
    <>
      {products
        .filter((x) => {
          if (category === x.category) {
            return true;
          }
          if (category === undefined || category === "") {
            return true;
          }
        })
        .map((product) => {
          return (
            <section key={product.id} className={styles.productitem}>
              <h2>{product.title}</h2>
              <h4>Category-Id: {product.category}</h4>
              <p>Product-Id: {product.id}</p>
              <p>Price: {product.price}</p>

              <p>Stock: {product.stock}</p>
              <p>{product.description}</p>
              <Link to={"/products/" + product.id}>Details</Link>
              {product.top ? <p className={styles["top-product"]}>Top</p> : ""}
            </section>
          );
        })}
    </>
  );
}
