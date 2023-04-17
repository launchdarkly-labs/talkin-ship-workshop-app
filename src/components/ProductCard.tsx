import Image from "next/image";
import styles from "@/styles/Home.module.css";


const ProductCard = ({ item, isGoggle, children }: any) => {
  return (
    <div className={isGoggle ? styles.newcard : styles.card}>
      <Image
        src={item.image}
        alt={item.toggle_name}
        loading="lazy"
        width={200}
        height={200}
        quality={100}
        style={{ padding: 10 }}
      />
      <h2 className="text-2xl">{item.toggle_name}</h2>
      <p style={{ padding: 4 }}>{item.description}</p>
      Price per unit: <span style={{ color: "green" }}>{item.price} </span>
      <div style={{ alignItems: "center", marginTop: 10 }}>{children}</div>
    </div>
  );
};

export default ProductCard;
