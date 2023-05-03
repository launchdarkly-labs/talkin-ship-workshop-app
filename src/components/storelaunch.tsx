import Image from "next/image";
import Inventory from "@/components/inventory";
import styles from "@/styles/Home.module.css";
import { Button } from "./ui/button";
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

const StoreContent = () => (
  <main className={styles.main}>
    
    <div className={cn("flex text-4xl border-b-4 border-orange-600 w-full md:text-6xl lg:text-8xl font-sans text-yellow-500 mx-auto place-items-center place-content-center animate-fade-in",
            fontSans.variable
          )}>
      <div className="">
          <Image
            src="/images/Toggle-5-Clipped.png"
            alt="Toggle"
            width={325}
            height={325}
            quality={100}
          />
        </div>
        <div>
        <p className=" text-xl md:text-3xl font-sans font-semibold lg:text-5xl text-black">The New </p>
        <p className=" text-transparent bg-clip-text font-sans font-extrabold bg-gradient-to-b from-orange-300 to-orange-600 pb-4">Toggle Outfitters! </p>
        {/* Future adspace area for experiment */}
        </div>
    </div>

    <div className={styles.center}>
      <Inventory />
    </div>
  </main>
);

export default StoreContent;
