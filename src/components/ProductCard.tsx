import styles from "@/styles/Home.module.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductCard = ({ item, isGoggle, children }: any) => {
  return (
    <Card className="m-2 border-2 shadow-lg rounded-xl group relative flex flex-col justify-center items-center h-72">
      {isGoggle && (
        <div className={[styles.ribbon, styles["ribbon-top-right"]].join(" ")}>
          <span>NEW</span>
        </div>
      )}
      <div className="group-hover:blur-[25px] transition-all duration-300 flex flex-col items-center">
        <CardHeader className="flex flex-col items-center">
          <img
            className="h-48 w-48"
            src={item.image}
            alt={item.toggle_name}
            loading="lazy"
            style={{ padding: 10 }}
          />
          <CardTitle>{item.toggle_name}</CardTitle>
        </CardHeader>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
        <CardContent className="flex flex-col justify-center items-center">
          <p className="mb-2 text-center">{item.description}</p>
          <div className="flex justify-center w-full">{children}</div>
          <p className="text-center mt-5">
            Price per unit:{" "}
            <span style={{ color: "green" }}>{item.price} </span>
          </p>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;
