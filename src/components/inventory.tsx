"use client";
import { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";
import ErrorDialog from "./ErrorDialog";
import AddToCartButton from "./ui/AddToCartButton";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import APIMigrationState from "./api-status";
import ReserveButton from "./ui/ReserveButton";
import useFetch from "@/hooks/useFetch";
import useErrorHandling from "@/hooks/useErrorHandling";
import ProductCard from "./ProductCard";

type Product = {
  description: string;
  id: string;
  image: string;
  nodeId: string;
  price: string;
  toggle_name: string;
  category: string;
  isFeatured: boolean;
};

const Inventory = () => {
  // import flags
  const { devdebug, billing, enableStripe, newProductExperienceAccess, featuredProductLabel } = useFlags();

  //function for adding form fill data to database
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateField = (field: string, event: any) => {
    if (field === "name") setName(event.target.value);
    if (field === "email") setEmail(event.target.value);
  };

  const onButtonClick = async () => {
    try {
      const body = { name, email };
      const response = await fetch("/api/form", {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify(body),
      });
      return response.status;
    } catch (error) {
      console.log("there was a problem");
      return 502
    }
  };

  const { errorState, setErrorState, errorTesting } = useErrorHandling();

  const [handleModal, setHandleModal] = useState(false);

  // define metric for experimentation
  const client = useLDClient();
  async function experimentData() {
    if (client) {
      client.track("Add to Cart Click", client.getContext(), 1);
      console.log("We're sending data to the experiment");
      client.track("storeClicks");
      client.flush();
    } else {
      console.log("boo hiss, we are not sending data to the experiment");
    }
  }

  const {
    data: stripeProducts,
    error: stripeProductsError,
    isLoading: stripeProductsLoading,
  } = useFetch("/api/products", enableStripe, newProductExperienceAccess );

  useEffect(() => {
    setErrorState(false);
    return () => clearTimeout(timerRef.current);
  }, [billing]);

  const handleClickTest = (e: any) => {
    e.preventDefault();
    setHandleModal(!handleModal);
    return handleModal
  };

  const timerRef = useRef(0);

  if (stripeProductsLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full"></div>
      </div>
    );
  }  if (stripeProductsError) return <p>Error: {stripeProductsError.message}</p>; 

  return (
    <div>
      {devdebug && (
        <div className={styles.apistatus} style={{ justifyContent: "center" }}>
          <APIMigrationState />
        </div>
      )}
      <div style={{
        visibility: 'hidden'
      }}>
        <span data-id="label-container">
          {featuredProductLabel
            ? featuredProductLabel
            : "none"}
        </span>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4">
        {stripeProducts.map((product: Product, index: number) => (
          <ProductCard
            key={index}
            item={product}
            featuredProductLabel={featuredProductLabel}
            isGoggle={product.category === "goggle"}
            isFeatured={index < 4}
          >
            {billing  ? (
              <AddToCartButton
                product={product}
                errorTesting={errorTesting}
                experimentData={experimentData}
              />
            ) : (
              <ReserveButton
                setHandleModal={setHandleModal}
                handleModal={handleModal}
                handleClickTest={handleClickTest}
                updateField={updateField}
                formData={{ name, email }}
                onButtonClick={onButtonClick}
                
              />
            )}
            {billing && 
            <ErrorDialog
              errorState={errorState}
              setErrorState={setErrorState}
            /> }
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
