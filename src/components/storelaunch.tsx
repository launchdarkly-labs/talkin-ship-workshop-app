import Image from "next/image";
import Inventory from "@/components/inventory";
import styles from "@/styles/Home.module.css";
import { Button } from "./ui/button";

const StoreContent = () => (
  <main className={styles.main}>
    
    <div className="flex text-4xl border-b-4 border-orange-600 w-full md:text-6xl lg:text-8xl text-yellow-500 mx-auto place-items-center place-content-center">
      <div className="">
          <Image
            src="/Toggle-5-Clipped.png"
            alt="Toggle"
            width={325}
            height={325}
            quality={100}
          />
        </div>
        <div>
        <p className="font-bold text-xl md:text-3xl lg:text-5xl text-black">The New </p>
        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-orange-600 pb-4">Toggle Outfitters! </p>
        {/* Future adspace area for experiment */}
        </div>
    </div>

    <div className={styles.center}>
      <Inventory />
    </div>
  </main>
);

export default StoreContent;
