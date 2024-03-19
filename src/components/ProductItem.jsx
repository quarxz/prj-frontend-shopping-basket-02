import styles from "./ProductItem.module.css";
import { useContext } from "react";

import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export function ProductItem({ products }) {
  const { user, url } = useContext(UserContext);
  return (
    // <section className={styles[product.category.toLowerCase().replace(/ & /g, "")]}>
    <>
      {products.map((product) => {
        return (
          <section key={product.id} className={styles.productitem}>
            <h2>{product.title}</h2>
            <h4>{product.category}</h4>
            <p>{product.id}</p>
            <p>{product.price}</p>

            <p>{product.description}</p>
            <Link to={"/products/" + product.id}>Details</Link>
            {product.top ? <p className={styles["top-product"]}>Top</p> : ""}
          </section>
        );
      })}
    </>
  );
}
