import styles from "@/styles/Home.module.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import CornerAccent from "./ui/corner-accent";
import { cn } from "@/lib/utils";

const ProductCard = ({
  item,
  isGoggle,
  isFeatured,
  children,
  featuredProductLabel,
}: any) => {
  return (
    <Card
      className={cn(
        "flex w-[280px] h-auto m-5 group shadow-xl relative flex-col justify-center items-center animate-fade-in grid-rows-2"
      )}
    >
      {(isGoggle && isFeatured) && (
        <CornerAccent label={isFeatured ? featuredProductLabel : "NEW"} />
      )}
      <CardHeader className="grid row-start-1">
        <img
          className="h-36 w-36"
          src={"/images/" + item.image}
          alt={item.name}
          loading="lazy"
          style={{ padding: 10 }}
        />
      </CardHeader>
      <div className={`grid h-full w-full row-start-2 ${styles.cardlower}`}>
      <CardContent >
        <CardTitle className={`${styles.cardtitle} font-sohnemono pt-4 text-white`}>{item.name || item.product_id}</CardTitle>
        <CardDescription className={`${styles.carddescription} pt-4 pb-4`}>{item.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full">{children}</div>
      </CardFooter>
      </div>
    </Card>
  );
};

export default ProductCard;
