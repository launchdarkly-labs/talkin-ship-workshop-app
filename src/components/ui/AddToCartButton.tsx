import { useShoppingCart } from "use-shopping-cart";
// Replace with the actual UI library used in the original code
import { useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { RocketIcon } from "@radix-ui/react-icons";
import {slate} from "@radix-ui/colors";
import {
    ToastViewport,
    ToastRoot,
    ToastTitle,
  } from '../component-library';
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon } from 'lucide-react';


const AddToCartButton = ({ product, errorTesting, clickHandler }: any) => {
  const { addItem } = useShoppingCart();
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);
  
  async function clickRunner() {
    const val = await errorTesting();
    if (val == 502) {
        throw { message: "API IS DOWN"}    
    } else {
    // TODO: await doesn't do anything here, we should remove it
    await addItem(product);
    await clickHandler();
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
        setOpen(true);
    }, 10);
}
  }

  return (
    <>
    {product && 
    <Toast.Provider key={product.id} swipeDirection="left">
      <Button variant="green" className="mt-2" key={product.id}
        onClick={() => {
          clickRunner();
        }}><ShoppingCartIcon className="mr-2" color="white" size={24} />
        Add to Cart
        </Button>
      <ToastRoot open={open} onOpenChange={setOpen}>
        <ToastTitle>Added to Cart!</ToastTitle>
        <RocketIcon
          color={slate.slate1}
          style={{ height: "30", width: "30" }}
        />
      </ToastRoot>
      <ToastViewport />
    </Toast.Provider>
}
    </>
  );
};

export default AddToCartButton;
