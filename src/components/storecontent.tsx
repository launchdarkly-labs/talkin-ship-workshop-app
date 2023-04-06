import Image from "next/image";
import Inventory from "@/components/store";
import styles from "@/styles/Home.module.css";
import { styled } from "@stitches/react";

const StoreContent = () => (
  <main className={styles.main}>
    <ToggleFive>
    <h1>Welcome to Toggle Outfitters!</h1>
    <Image src="/high-five.png" alt="Toggle" width={225} height={225} quality={100} />
    </ToggleFive>
    <div className={styles.center}>
      <Inventory />
    </div>
  </main>
);



const ToggleFive = styled("div", {
  unset: "all",
  marginTop: 10,
  fontSize: 25,
  color: "white",
  textAlign: "center",
  font: "Sohne",
  alignContent: "center",
  display: "block", 
  width: "40vw",
})

export default StoreContent;