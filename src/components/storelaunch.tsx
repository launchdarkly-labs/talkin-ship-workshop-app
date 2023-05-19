import Image from "next/image";
import Inventory from "@/components/inventory";
import styles from "@/styles/Home.module.css";
import { Button } from "./ui/button";
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const StoreContent = () => (
  <main className={styles.main}>
    
    <div className={cn("flex text-3xl  w-full md:text-6xl lg:text-8xl font-sans text-yellow-500 mx-auto place-items-center place-content-center animate-fade-in",
            fontSans.variable
          )}>
        <div>
        <p className={styles.subhead}>The New </p>
        <p className={styles.outfitters}>Toggle </p>
        <p className={styles.outfitters}>Outfitters! </p>
        {/* Future adspace area for experiment */}
        </div>
        <div className="">
          <Image
            src="/images/Toggle-5-Clipped.png"
            alt="Toggle"
            width={325}
            height={325}
            quality={100}
          />
        </div>
    </div>

    <div className={styles.center}>
      <Inventory />
    </div>
  </main>
);

export default StoreContent;
