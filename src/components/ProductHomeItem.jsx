import styles from "./ProductItem.module.css";

import { Link } from "react-router-dom";

export function ProductHomeItem({ product }) {
  console.log(product.category);
  return (
    // <section className={styles[product.category.toLowerCase().replace(/ & /g, "")]}>

    <>
      <section key={product.id} className={styles.productitem}>
        <h2>{product.title}</h2>
        <h4>{product.category}</h4>
        <p>{product.id}</p>
        <p>{product.description}</p>
        <Link to={"/products/" + product.id}>Details</Link>

        {product.top ? <p className={styles["top-product"]}>Top</p> : ""}
      </section>
    </>
  );
}
