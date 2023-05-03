import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavigationMenuDemo from "@/components/menu";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import StoreLaunch from "@/components/storelaunch";
import StorePreview from "@/components/storepreview";
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export default function Home() {
  const { storeEnabled } = useFlags();

  return (
    <div className={cn("font-sans", fontSans.variable)}>
        <Head>
          <title>Toggle Outfitters</title>
        </Head>
        <header className={styles.header}>
          <NavigationMenuDemo />
        </header>
        {storeEnabled ? <StoreLaunch /> : <StorePreview />}
    </div>
  );
}
