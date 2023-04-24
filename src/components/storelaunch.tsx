import Image from "next/image";
import Inventory from "@/components/inventory";
import styles from "@/styles/Home.module.css";

const StoreContent = () => (
  <main className={styles.main}>
    <div className="text-4xl border-b-4 border-orange-600 w-full md:text-6xl lg:text-8xl text-yellow-500 mx-auto place-items-center place-content-center">
      <p className="mt-4 font-bold text-center text-xl md:text-3xl lg:text-5xl text-black">The New </p>
      <p className="font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-yellow-500 pb-4">Toggle Outfitters! </p>
      <div className="flex place-content-center">
        <Image
          src="/high-five.png"
          alt="Toggle"
          width={225}
          height={225}
          quality={100}
        />
      </div>
    </div>
    <div className={styles.center}>
      <Inventory />
    </div>
  </main>
);

// const ToggleFive = styled("div", {
//   unset: "all",
//   marginTop: 10,
//   fontSize: 25,
//   color: "DarkKhaki",
//   textAlign: "center",
//   font: "Sohne",
//   alignContent: "center",
//   display: "block",
//   width: "40vw",
// })

export default StoreContent;
