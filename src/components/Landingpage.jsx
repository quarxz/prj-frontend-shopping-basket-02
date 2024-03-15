import styles from "./Landingpage.module.css";
import qrcode from "../assets/img/promo10.png";

export function Landingpage() {
  return (
    <>
      <h3>Landigpage</h3>
      <div>
        <img src={qrcode} width="200px" />
      </div>
    </>
  );
}
