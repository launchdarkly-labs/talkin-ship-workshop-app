import Image from "next/image";
import Inventory from "@/components/store";
import styles from "@/styles/Home.module.css";

const StoreContent = () => (
  <main className={styles.main}>
    <Image src="/high-five.png" alt="Toggle" width={250} height={250} quality={100} />
    <h1 className='text-blue-600'>Welcome to Toggle's Toggle Store!</h1>
    <div className={styles.center}>
      <Inventory />
    </div>
  </main>
);

export default StoreContent;