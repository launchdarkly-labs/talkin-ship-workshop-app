"use client";
import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { styled, keyframes } from "@stitches/react";
import { CaretDownIcon } from "@radix-ui/react-icons";
import {
  mauve,
  blackA,
  blueDark,
  grayDark,
  red,
  slate,
  whiteA,
} from "@radix-ui/colors";
import CartSummary from "./ui/cart-summary";
import { useShoppingCart } from "use-shopping-cart";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import Login from "./login";
import Image from "next/image";
import APIMigrationState from "./api-status";
import AdminPanel from "./adminPanel";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "lucide-react";
import logo from "/public/images/ld-white-wide.png";
import ts from "/public/images/talkin-ship.png";
import { setCookie } from "cookies-next";

const NavigationMenuDemo = () => {
  const [uiCountry, setUICountry] = React.useState("US");
  const {
    updatedBillingUi,
    releaseUpdatedStorefront,
    adminMode,
    newProductExperienceAccess,
    devdebug,
  } = useFlags();
  const { cartCount } = useShoppingCart();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const ldclient = useLDClient();

  const changeCountry = (country: any) => {
    if (ldclient) {
      console.log(country);
      setUICountry(country);
      const context: any = ldclient?.getContext();
      context.location.country = country;
      ldclient?.identify(context);
      setCookie("ldcontext", context);
    }
  };

  const context: any = ldclient?.getContext();
  console.log(context);
  return (
    <NavigationMenuRoot className="bg-black p-2 shadow-2xl">
      <Link href="/">
        <Image src={ts} className="ml-4 p-2" alt="logo" height={55} />
      </Link>
      <NavigationMenuList>
        {/***********************************************************************************
        "Goggles Go Global", Step 4, replace this comment block with the code from the guide
        *************************************************************************************/}

        {/**********************************************************************   
        "Taking on Database Migrations - Getting Our Application Ready", Step 2, 
        replace this comment block with the code from the guide
        ************************************************************************/}
        {updatedBillingUi && releaseUpdatedStorefront ? (
          <NavigationMenu.Item>
            <NavigationMenuTrigger>
              <div className="bg-blue-500 p-2 text-white" style={{ width: "85px", height: "40px", alignItems: 'center', display: 'flex' }}>
                <ShoppingCartIcon className="mr-2" color="white" size={24} />(
                {cartCount}){" "}
                <CaretDown color="white" className="ml-2" aria-hidden />
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div style={{ minWidth: "275px", margin: 30 }}>
                <CartSummary />
              </div>
            </NavigationMenuContent>
          </NavigationMenu.Item>
        ) : null}
        <NavigationMenu.Item>
          <NavigationMenuLink>
            <Login />
          </NavigationMenuLink>
        </NavigationMenu.Item>
        <NavigationMenuIndicator>
          <Arrow />
        </NavigationMenuIndicator>
      </NavigationMenuList>
      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenuRoot>
  );
};

const enterFromRight = keyframes({
  from: { transform: "translateX(200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: "translateX(-200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(200px)", opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(-200px)", opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const NavigationMenuRoot = styled(NavigationMenu.Root, {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0 auto",
  width: "100vw",
  zIndex: 999,
});

const NavigationMenuList = styled(NavigationMenu.List, {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "none",
  zIndex: 999,
  listStyle: "none",
  margin: 0,
});

const itemStyles = {
  padding: "8px 12px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: blueDark.blue10,
  // '&:focus': { boxShadow: `0 0 0 2px ${blueDark.blue7}` },
  // '&:hover': { backgroundColor: blueDark.blue3 },
};

const NavigationMenuTrigger = styled(NavigationMenu.Trigger, {
  all: "unset",
  ...itemStyles,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 999,
  gap: 2,
});

const NavigationMenuLink = styled(NavigationMenu.Link, {
  ...itemStyles,
  display: "flex",
  textDecoration: "none",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 999,
  gap: 2,
});

const NavigationMenuContent = styled(NavigationMenu.Content, {
  position: "absolute",
  zIndex: 999,
  top: 0,
  left: 0,
  width: "100%",
  "@media only screen and (min-width: 600px)": { width: "auto" },
  animationDuration: "250ms",
  animationTimingFunction: "ease",
  '&[data-motion="from-start"]': { animationName: enterFromLeft },
  '&[data-motion="from-end"]': { animationName: enterFromRight },
  '&[data-motion="to-start"]': { animationName: exitToLeft },
  '&[data-motion="to-end"]': { animationName: exitToRight },
});

const NavigationMenuIndicator = styled(NavigationMenu.Indicator, {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  height: 10,
  top: "100%",
  overflow: "visible",
  zIndex: 1,
  transition: "width, transform 200ms ease",
  '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
  '&[data-state="hidden"]': { animation: `${fadeOut} 50ms ease` },
});

const NavigationMenuViewport = styled(NavigationMenu.Viewport, {
  position: "relative",
  transformOrigin: "top center",
  zIndex: 999,
  width: "100%",
  backgroundColor: slate.slate4,
  borderRadius: 6,
  overflow: "hidden",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  height: "var(--radix-navigation-menu-viewport-height)",
  transition: "width, height, 300ms ease",
  '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
  '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  "@media only screen and (min-width: 600px)": {
    width: "var(--radix-navigation-menu-viewport-width)",
  },
});

const List = styled("ul", {
  display: "grid",
  padding: 22,
  margin: 0,
  zIndex: 999,
  columnGap: 10,
  listStyle: "none",
  variants: {
    layout: {
      one: {
        "@media only screen and (min-width: 600px)": {
          width: 500,
          gridTemplateColumns: ".75fr 1fr",
        },
      },
      two: {
        "@media only screen and (min-width: 600px)": {
          width: 600,
          gridTemplateRows: "repeat(1, 1fr)",
          gridTemplateColumns: "repeat(1, 1fr)",
        },
      },
    },
  },
  defaultVariants: {
    layout: "one",
  },
});

const ListItem = React.forwardRef(
  ({ children, title, ...props }: any, forwardedRef: any) => (
    <li>
      <NavigationMenu.Link asChild>
        <ListItemLink {...props} ref={forwardedRef}>
          <ListItemHeading>{title}</ListItemHeading>
          <ListItemText>{children}</ListItemText>
        </ListItemLink>
      </NavigationMenu.Link>
    </li>
  )
);
ListItem.displayName = "ListItem";

const ListItemLink = styled("a", {
  display: "block",
  outline: "none",
  textDecoration: "none",
  userSelect: "none",
  padding: 12,
  borderRadius: 6,
  fontSize: 15,
  lineHeight: 1,
  "&:focus": { boxShadow: `0 0 0 2px ${grayDark.gray7}` },
  "&:hover": { backgroundColor: mauve.mauve3 },
});

const ListItemHeading = styled("div", {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
});

const ListItemText = styled("p", {
  all: "unset",
  color: mauve.mauve11,
  lineHeight: 1.4,
  fontWeight: "initial",
});

const ViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "right",
  width: "100%",
  top: "100%",
  left: 0,
  perspective: "2000px",
});

const CaretDown = styled(CaretDownIcon, {
  position: "relative",
  color: blueDark.blue10,
  top: 1,
  transition: "transform 250ms ease",
  "[data-state=open] &": { transform: "rotate(-180deg)" },
});

const CaretDownDebug = styled(CaretDownIcon, {
  position: "relative",
  color: "orange",
  top: 1,
  transition: "transform 250ms ease",
  "[data-state=open] &": { transform: "rotate(-180deg)" },
});

const Arrow = styled("div", {
  position: "relative",
  top: "100%",
  backgroundColor: slate.slate4,
  width: 15,
  height: 15,
  transform: "rotate(45deg)",
  borderTopLeftRadius: 2,
});

export default NavigationMenuDemo;
