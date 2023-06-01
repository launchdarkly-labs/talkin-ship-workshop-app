import Image from "next/image";
import styles from "@/styles/Home.module.css";


const InitialContent = () => (
  <main
    className={`${styles.main} flex flex-col items-center justify-center min-h-screen`}
  >
    <div>
      <div className="flex place-content-center">
        <h1 className={`text-2xl lg:text-6xl text-white font-sohnemono`}>
          <span className={styles.outfitters}>Toggle Outfitters</span>
        </h1>
      </div>
      <div className="flex place-content-center">
        <Image
          src="/high-five.png"
          alt="Toggle"
          width={250}
          height={250}
          quality={100}
          priority={true}
        />
      </div>
      <div className="flex place-content-center">
        <h2 className={`font-sohne text-white text-2xl lg:text-6xl`}>
          Launching Soon
        </h2>
      </div>
    </div>
    <div className="flex flex-row place-content-center"></div>
    <div className="flex text-2xl mt-4 place-content-center"></div>
  </main>
);

export default InitialContent;
