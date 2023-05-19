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
        "flex w-[280px] h-auto m-2 group shadow-xl relative flex-col justify-center items-center animate-fade-in grid-rows-2"
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
        <CardTitle className="font-sohne pt-4 text-white">{item.name || item.product_id}</CardTitle>
        <CardDescription className="font-sohne text-ldtsgray  pt-4 pb-4">{item.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full">{children}</div>
      </CardFooter>
      </div>
    </Card>

    //     <Card className="m-2 border-2 group relative flex flex-col justify-center items-center h-72 animate-fade-in">
    //       {(isGoggle || isFeatured) && (
    //         <CornerAccent label={isFeatured ? featuredProductLabel : "NEW"} />
    //       )}
    //   <CardHeader>
    //   <img
    //             className="h-40 w-40"
    //             src={"/images/"+item.image}
    //             alt={item.name}
    //             loading="lazy"
    //             style={{ padding: 10 }}
    //           />
    //     <CardTitle>{item.name||item.product_id}</CardTitle>
    //     <CardDescription>Card Description</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <p>Card Content</p>
    //   </CardContent>
    //   <CardFooter>
    //     <p>Card Footer</p>
    //   </CardFooter>
    // </Card>

    // <Card className="m-2 border-2 group relative flex flex-col justify-center items-center h-72 animate-fade-in">

    //     <CardHeader className="flex flex-col items-center">

    //       <CardTitle></CardTitle>
    //     </CardHeader>
    //     <CardContent className="flex flex-col justify-center items-center">
    //       <p className="text-center">{item.description}</p>
    //       <div className="flex justify-center w-full">{children}</div>
    //       <p className="text-center">
    //         Price per unit:{" "}
    //         <span style={{ color: "green" }}>${item.price} </span>
    //       </p>
    //     </CardContent>
    // </Card>
  );
};

export default ProductCard;
