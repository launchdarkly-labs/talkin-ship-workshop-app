"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import styles from "@/styles/Home.module.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import ErrorDialog from "./ErrorDialog";
import AddToCartButton from "./AddToCartButton";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import APIMigrationState from "./status-toast";
import ReserveButton from "./ReserveButton";
import useFetch from "@/hooks/useFetch";
import useErrorHandling from "@/hooks/useErrorHandling";
import ProductCard from "./ProductCard";

const Inventory = () => {
  // import flags
  const { devdebug, billing, newProductExperienceAccess } = useFlags();

  //function for adding form fill data to database
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //GraphQL query for the inventory
  const TOGGLE_QUERY = gql`
    query ToggleQuery {
      toggletableCollection(
        filter: { category: {in: [${newProductExperienceAccess}] }}
        ) {
        edges {
          node {
            description
            id
            image
            nodeId
            price
            toggle_name
            category
          }
        }
      }
    }
    `;

  const updateField = (field: string, event: any) => {
    if (field === "name") setName(event.target.value);
    if (field === "email") setEmail(event.target.value);
  };

  const onButtonClick = async () => {
    console.log("going");
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
    }
  };

  // define metric for experimentation
  const client = useLDClient();
  function experimentData() {
    client?.track("storeClicks");
    console.log("We're sending data to the experiment");
  }

  const { errorState, setErrorState, errorTesting } = useErrorHandling();

  const [handleModal, setHandleModal] = useState(false);

  const {
    data: stripeProducts,
    error: stripeProductsError,
    isLoading: stripeProductsLoading,
  } = useFetch("/api/products");

  useEffect(() => {
    setErrorState(false);
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClickTest = (e: any) => {
    e.preventDefault();
    setHandleModal(!handleModal);
  };

  const productsList = useMemo(() => {
    if (!stripeProducts) return [];

    let productListTemp: any = [];
    let i = 0;
    Object.keys(stripeProducts).forEach((key) => {
      productListTemp[i] = {
        id: i,
        product_id: stripeProducts[key]["metadata"]["product_id"],
        price_id: stripeProducts[key]["default_price"],
      };
      i++;
    });

    return productListTemp;
  }, [stripeProducts]);

  const timerRef = useRef(0);

  const { loading, error, data } = useQuery(TOGGLE_QUERY);
  if (loading) return <p>loading</p>;
  if (error) return <p> Error: {error.message}</p>;

  if (stripeProductsLoading) return <p>Loading Stripe products...</p>;
  if (stripeProductsError) return <p>Error: {stripeProductsError.message}</p>;

  let items = [...data.toggletableCollection.edges];
  items = items.sort((a: any, b: any) => {
    if (a.id > b.id) return 1;
    return -1;
  });

  return (
    <div>
      {devdebug && (
        <div className={styles.apistatus} style={{ justifyContent: "center" }}>
          <APIMigrationState />
        </div>
      )}
      <div className={styles.grid}>
        {items.map((id: any, node: any) => (
          <ProductCard
            key={node}
            item={id["node"]}
            isGoggle={id["node"].category === "goggle"}
          >
            {billing ? (
              <AddToCartButton
                product={productsList.find(
                  (product: any) =>
                    product.product_id === id["node"].toggle_name
                )}
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
                experimentData={experimentData}
              />
            )}
            <ErrorDialog
              errorState={errorState}
              setErrorState={setErrorState}
            />
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
