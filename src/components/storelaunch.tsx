import Image from "next/image";
import Inventory from "@/components/inventory";
import styles from "@/styles/Home.module.css";
import { Button } from "./ui/button";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const StoreContent = () => (
  <main className={`min-h-screen ${styles.main}`}>
    <div
      className={cn(
        "flex text-3xl mt-24 w-full md:text-6xl lg:text-7xl font-sans text-yellow-500 mx-auto place-items-center place-content-center animate-fade-in",
        fontSans.variable
      )}
    >
      <div>
        <p className={`text-lg md:text-2xl lg:text-4xl ${styles.subhead}`}>
          The New{" "}
        </p>
        <p className={styles.outfitters}>Toggle Outfitters!</p>
        {/* Future adspace area for experiment */}
      </div>
    </div>

    <div className={`mb-24 ${styles.center}`}>
      <Inventory />
    </div>
  </main>
);

export default StoreContent;
