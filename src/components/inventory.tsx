"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { styled, keyframes } from "@stitches/react";
import { blackA, blueDark, slate, mauve, grass } from "@radix-ui/colors";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Form from "@radix-ui/react-form";
import { useShoppingCart } from "use-shopping-cart";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import product from "@/config/products";
import * as Toast from "@radix-ui/react-toast";
import { RocketIcon } from "@radix-ui/react-icons";

//GraphQL query for the inventory
const TOGGLE_QUERY = gql`
  query ToggleQuery {
    toggletableCollection {
      edges {
        node {
          description
          id
          image
          nodeId
          price
          toggle_name
        }
      }
    }
  }
`;

// const inter = Inter({ subsets: ["latin"] });

const Inventory = () => {
  // import flags
  const { billing } = useFlags();

  //function for adding form fill data to database
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateName = (e: any) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const updateEmail = (e: any) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onButtonClick = async () => {
    console.log("going")
    try {
      const body = { name, email };
      const response = await fetch("/api/form", {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify(body),
      });
      return response.status
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

  // check if API is returning error message
  const [errorState, setErrorState] = useState(false);
  const errorTesting = async () => {
    try {
      let res = "";
      const response = await fetch("/api/checkout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData == "the API is unreachable") {
        setErrorState(true);
      } else {
        setErrorState(false);
      }
    } catch (e) {
      console.log("is it running?");
    }
  };

  useEffect(() => {
    setErrorState(false);
    console.log(errorState);
  }, []);

  // some button config things
  const { addItem } = useShoppingCart();
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // load GraphQL data for mapping inventory
  const { loading, error, data } = useQuery(TOGGLE_QUERY);
  // console.log(data.toggletableCollection.edges);
  if (loading) return <p>loading</p>;
  if (error) return <p> Error: {error.message}</p>;
  const items = data.toggletableCollection.edges
  console.log(product)
  return (
    <div className={styles.grid}>
      {items.map(
        (id:any, node:any) => (
          <div key={node} className={styles.card}>
            <Image
              key={node}
              src={`${id['node'].image}?w=248&fit=crop&auto=format`}
              alt={id.toggle_name}
              loading="lazy"
              width={200}
              height={200}
              quality={100}
              style={{ padding: 10 }}
            />
            <h3 >
              {id['node'].toggle_name}
              <span>-&gt;</span>
            </h3>
            <p  style={{ paddingTop: "10px" }}>
              {id['node'].description}
            </p>
            <br></br>
            <p >
              <strong>Price per unit: {id['node'].price} </strong>
            </p>
            <div style={{ alignItems: "center", marginTop: 10 }}>
              {billing ? (
                product
                  .filter((product) => product.id === node)
                  .map((product) => (
                    <Toast.Provider key={product.id} swipeDirection="left">
                      <Button
                        key={product.id}
                        onClick={() => {
                          addItem(product),
                            errorTesting(),
                            experimentData(),
                            setOpen(false);
                          window.clearTimeout(timerRef.current);
                          timerRef.current = window.setTimeout(() => {
                            setOpen(true);
                          }, 10);
                        }}
                      >
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
                  ))
              ) : (
                <AlertDialog.Root>
                  <AlertDialog.Trigger>
                    <Button
                      onClick={() => {
                        experimentData();
                      }}
                    >
                      Contact Sales
                    </Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                      <FormRoot>
                        <AlertDialogTitle>
                          Thanks for your interest in our Toggles!
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Please provide your contact info and our Toggle
                          Specialists will contact you in 3-5 business days
                        </AlertDialogDescription>
                        <FormField name="name">
                          <Flex
                            css={{
                              alignItems: "baseline",
                              justifyContent: "space-between",
                            }}
                          >
                            <FormLabel>Name</FormLabel>
                            <FormMessage match="valueMissing">
                              Please enter your name
                            </FormMessage>
                          </Flex>
                          <Form.Control asChild>
                            <Input
                              type="name"
                              required
                              value={name}
                              onChange={updateName}
                            />
                          </Form.Control>
                        </FormField>
                        <FormField name="email">
                          <Flex
                            css={{
                              alignItems: "baseline",
                              justifyContent: "space-between",
                            }}
                          >
                            <FormLabel>Email</FormLabel>
                            <FormMessage match="valueMissing">
                              Please enter your email
                            </FormMessage>
                            <FormMessage match="typeMismatch">
                              Please enter a valid email
                            </FormMessage>
                          </Flex>
                          <Form.Control asChild>
                            <Input
                              type="email"
                              required
                              value={email}
                              onChange={updateEmail}
                            />
                          </Form.Control>
                        </FormField>
                        <Flex css={{ justifyContent: "flex-end" }}>
                          <AlertDialog.Cancel asChild>
                            <Button css={{ marginRight: 25 }}>Cancel</Button>
                          </AlertDialog.Cancel>
                          <Form.Submit
                            asChild
                            onSubmit={(e) => e.preventDefault()}
                          >
                            <Button
                              variant="green"
                              onClick={() => {
                                onButtonClick();
                              }}
                            >
                              Submit
                            </Button>
                          </Form.Submit>
                        </Flex>
                      </FormRoot>
                    </AlertDialogContent>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              )}
              {errorState ? (
                <AlertDialog.Root defaultOpen={true}>
                  <AlertDialog.Trigger />
                  <AlertDialog.Portal>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                      <FormRoot
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <AlertDialogTitle>
                          Uh oh! Looks like an error!
                        </AlertDialogTitle>
                        <Flex css={{ justifyContent: "flex-end" }}>
                          <AlertDialog.Cancel asChild>
                            <Button
                              variant="green"
                              onClick={() => {
                                setErrorState(false);
                              }}
                            >
                              Close
                            </Button>
                          </AlertDialog.Cancel>
                        </Flex>
                      </FormRoot>
                    </AlertDialogContent>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              ) : null}
            </div>
          </div>
        )
      )}
    </div>
  );
};

//Form styling
const FormRoot = styled(Form.Root, {
  width: 425,
});

const FormField = styled(Form.Field, {
  display: "grid",
  marginBottom: 10,
});

const FormLabel = styled(Form.Label, {
  fontSize: 15,
  // fontFamily: "inter",
  fontWeight: 500,
  lineHeight: "35px",
  paddingTop: "10px",
  color: "black",
});

const FormMessage = styled(Form.Message, {
  fontSize: 13,
  color: "black",
  opacity: 0.8,
});

const inputStyles = {
  all: "unset",
  boxSizing: "border-box",
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,

  fontSize: 15,
  // fontFamily: "inter",
  color: "black",
  backgroundColor: blackA.blackA5,
  boxShadow: `0 0 0 1px ${blackA.blackA9}`,
  "&:hover": { boxShadow: `0 0 0 1px black` },
  "&:focus": { boxShadow: `0 0 0 2px black` },
  "&::selection": { backgroundColor: blackA.blackA9, color: "white" },
};

const Input = styled("input", {
  ...inputStyles,
  height: 35,
  lineHeight: 1,
  padding: "0 10px",
});

const Textarea = styled("textarea", {
  ...inputStyles,
  resize: "none",
  padding: 10,
});

//button and modal styling
const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const AlertDialogOverlay = styled(AlertDialog.Overlay, {
  backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const AlertDialogContent = styled(AlertDialog.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "500px",
  maxHeight: "85vh",
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  "&:focus": { outline: "none" },
});

const AlertDialogTitle = styled(AlertDialog.Title, {
  margin: 0,
  color: mauve.mauve12,
  fontSize: 17,
  fontWeight: 500,
  // fontFamily: "inter",
});

const AlertDialogDescription = styled(AlertDialog.Description, {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  // fontFamily: "Inter",
  lineHeight: 1.5,
});

const Flex = styled("div", { display: "flex" });

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  // fontFamily: "Inter",
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      black: {
        backgroundColor: "white",
        color: blueDark.blue1,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: slate.slate7 },
      },
      green: {
        backgroundColor: grass.grass4,
        color: grass.grass11,
        "&:hover": { backgroundColor: grass.grass5 },
        "&:focus": { boxShadow: `0 0 0 2px ${grass.grass7}` },
      },
    },
  },

  defaultVariants: {
    variant: "black",
  },
});

const VIEWPORT_PADDING = 25;

const ToastViewport = styled(Toast.Viewport, {
  position: "fixed",
  bottom: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 300,
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 2147483647,
  outline: "none",
});

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: `translateX(calc(0% + ${VIEWPORT_PADDING}px))` },
});

const swipeOut = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
});

const ToastRoot = styled(Toast.Root, {
  backgroundColor: grass.grass10,
  borderRadius: 6,
  padding: 15,
  display: "grid",
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: "auto max-content",
  columnGap: 15,
  alignItems: "center",

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-swipe="move"]': {
    transform: "translateX(var(--radix-toast-swipe-move-x))",
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },
});

const ToastTitle = styled(Toast.Title, {
  gridArea: "title",
  marginBottom: 0,
  fontWeight: 500,
  color: slate.slate1,
  fontSize: 20,
});

export default Inventory;
