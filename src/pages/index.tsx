import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavigationMenuDemo from "@/components/menu";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import StoreLaunch from "@/components/storelaunch";
import StorePreview from "@/components/storepreview";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function Home() {
  // We'll need to import the flag, make sure you uncomment the next line!
  // const { storeEnabled } = useFlags();

  return (
    <div className={cn("font-sohne")}>
        <Head>
          <title>Toggle Outfitters</title>
        </Head>
        <div className="min-h-screen bg-black">
        <header className={`fixed z-50 ${styles.header}`}>
          <NavigationMenuDemo />
        </header>
      {/********************************************************************************************************
      * Retrieve Code from "Shipping Your First Feature with LaunchDarkly - Dark Launching our Feature", Step 3
      **********************************************************************************************************/}
      <StorePreview /> 
      {/**********************************************************
       * Replace the above component with the code from the guide 
       **********************************************************/}
    </div>
    </div>
  );
}
