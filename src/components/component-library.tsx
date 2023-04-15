import * as Form from "@radix-ui/react-form";
import { styled, keyframes } from "@stitches/react";
import * as Toast from "@radix-ui/react-toast";
import {
    blackA,
    blueDark,
    slate,
    mauve,
    grass,
    whiteA,
  } from "@radix-ui/colors";
  import * as AlertDialog from "@radix-ui/react-alert-dialog";

const FormRoot = styled(Form.Root, {
    width: 425,
  });
  
  const FormField = styled(Form.Field, {
    display: "grid",
    marginBottom: 10,
  });
  
  const FormLabel = styled(Form.Label, {
    fontSize: 15,
    fontFamily: "Sohne",
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
    fontFamily: "Sohne",
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
    fontFamily: "Sohne",
  });
  
  const AlertDialogDescription = styled(AlertDialog.Description, {
    marginBottom: 20,
    color: mauve.mauve11,
    fontSize: 15,
    fontFamily: "Sohne",
    lineHeight: 1.5,
  });
  
  const Flex = styled("div", { display: "flex" });
  
  const Button = styled("button", {
    all: "unset",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    padding: "0 20px",
    fontSize: 15,
    fontFamily: "Sohne",
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
          backgroundColor: slate.slate7,
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
    // zIndex: 1,
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

  export {
    FormRoot,
    FormField,
    FormLabel,
    FormMessage,
    Input,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    Flex,
    Button,
    ToastViewport,
    ToastRoot,
    ToastTitle,
  };