import Image from "next/image";
import styles from "@/styles/Home.module.css";

const InitialContent = () => (
  <main className={styles.main}>
    <div style={{ position: "absolute", textAlign: "center", height: "800px" }}>
      <Image
        src="/high-five.png"
        alt="Toggle"
        width={250}
        height={250}
        quality={100}
      />
      <h1 style={{ color: "white" }}>Welcome to Toggle Outfitters!</h1>
      <br></br>
      <h3 style={{ margin: 5, color: "white" }}>
        Hand-crafted, 100% organic toggles for all your jacket needs.
      </h3>
      <br></br>
      <Image
        src="/toggle-1.jpg"
        alt="Toggle"
        width={250}
        height={250}
        quality={100}
        style={{ padding: "20px" }}
      />
      <Image
        src="/toggle-2.webp"
        alt="Toggle"
        width={250}
        height={250}
        quality={100}
        style={{ padding: "20px" }}
      />
      <Image
        src="/toggle-3.webp"
        alt="Toggle"
        width={250}
        height={250}
        quality={100}
        style={{ padding: "20px" }}
      />
      <Image
        src="/toggle-4.webp"
        alt="Toggle"
        width={250}
        height={250}
        quality={100}
        style={{ padding: "20px" }}
      />
      <h3 style={{ margin: 5, color: "white" }}>
        For information about ordering our toggles, please contact{" "}
        <a href="mailto:thetogglestore@toggles.com" style={{ color: "blue" }}>
          thetogglestore@toggles.com
        </a>
      </h3>
    </div>
  </main>
);

export default InitialContent;
