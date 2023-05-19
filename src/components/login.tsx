// @ts-nocheck
import * as React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as Separator from "@radix-ui/react-separator";
import { styled, keyframes } from "@stitches/react";
import { User, CheckCircle2 } from "lucide-react";
import {
  mauve,
  blackA,
  blueDark,
  grayDark,
  violet,
  cyan,
  green,
  whiteA,
  slate,
} from "@radix-ui/colors";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useState, useContext, useRef } from "react";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { setCookie, getCookie } from "cookies-next";
import { Login_data } from "@/context/state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fontSans } from "@/lib/fonts";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

export default function Login() {
  const inputRef = useRef();
  const { isLoggedIn, setIsLoggedIn } = useContext(Login_data);
  const [handleModal, setHandleModal] = useState(false);
  const ldclient = useLDClient();
  const [isInBeta, setIsInBeta] = useState(false);
  const [userName, setUserName] = useState("");
  const [betaUsers, setBetaUsers] = useState([]);

  function handleLogin(e: Event) {
    // Setting the user's name in the context object
    let user = "Toggle";
    e.preventDefault();
    setIsLoggedIn(true);
    const context: any = ldclient?.getContext();
    console.log(context);
    const optedIn = betaUsers.find((element) => element === user);
    console.log(optedIn);
    if (optedIn === user) {
      context.user.inBeta = true;
      setIsInBeta(true);
    } else {
      context.user.inBeta = false;
      setIsInBeta(false);
    }
    context.user.name = user;
    ldclient?.identify(context);
    setCookie("ldcontext", context);
    console.log(context);
    setHandleModal(false);
    setUserName(user);
  }

  function handleLogout() {
    console.log("logout-happened");
    setIsLoggedIn(false);
    setIsInBeta(false);
    const context: any = ldclient?.getContext();
    context.user.name = "Anonymous";
    context.user.inBeta = false;
    ldclient?.identify(context);
    setCookie("ldcontext", context);
  }

  function enterBeta() {
    setIsInBeta(true);
    const context: any = ldclient?.getContext();
    context.user.inBeta = true;
    ldclient?.identify(context);
    setCookie("ldcontext", context);
    setBetaUsers((betaUsers) => [...betaUsers, userName]);
    console.log(betaUsers);
  }

  function leaveBeta() {
    setIsInBeta(false);
    const context: any = ldclient?.getContext();
    context.user.inBeta = false;
    ldclient?.identify(context);
    setCookie("ldcontext", context);
    setBetaUsers((betaUsers) => {
      return betaUsers.filter((betaUsers) => {
        betaUsers !== userName;
      });
    });
    console.log(betaUsers);
  }

  if (getCookie("ldcontext") === undefined) {
    const context: any = ldclient?.getContext();
    setCookie("ldcontext", context);
  }

  if (!isLoggedIn) {
    return (
      <Button
        onClick={(e) => handleLogin(e)}
        className="text-xl bg-black hover:bg-white hover:text-black text-white"
        variant="outline"
      >
        Login
      </Button>
      //   <Dialog>
      //   <DialogTrigger asChild>
      //     <Button className="text-xl bg-black hover:bg-white hover:text-black text-white" variant="outline">Login</Button>
      //   </DialogTrigger>
      //   <DialogContent className={cn("sm:max-w-[425px] font-sans", fontSans.variable)}>
      //     <DialogHeader>
      //       <DialogTitle>Login to Toggle Outfitters</DialogTitle>
      //       <DialogDescription>
      //         Because we need to know you, to send you things.
      //       </DialogDescription>
      //     </DialogHeader>
      //     <div className="grid gap-4 py-4">
      //       <div className="grid grid-cols-4 items-center gap-4">
      //         <Label htmlFor="name" className="text-right">
      //           Username
      //         </Label>
      //         <Input id="name" className="col-span-3" required ref={inputRef} />
      //       </div>
      //       <div className="grid grid-cols-4 items-center gap-4">
      //         <Label htmlFor="username" className="text-right">
      //           Password
      //         </Label>
      //         <Input id="username" type='password' className="col-span-3" />
      //       </div>
      //     </div>
      //     <DialogFooter>
      //       <Button className="bg-green-500" type="submit" onClick={(e) => handleLogin(e)}>Submit</Button>
      //     </DialogFooter>
      //   </DialogContent>
      // </Dialog>
    );
  } else {
    return (
      <AlertDialog.Root>
        <AlertDialogTrigger>
          <NavigationMenuTrigger>
            <Button variant="outline" className="hover:bg-white ">
              <User className="mr-2" color="white" size={24} />
              <div className="text-md xl:text-lg text-white hover:text-black">
                {userName}{" "}
              </div>
              <CaretDown color="white" className="ml-2" aria-hidden />
            </Button>
            <NavigationMenuContent>
              <List>
                <ListItem>
                  <AvatarRoot>
                    <AvatarImage src="/images/thumbs-up.png"></AvatarImage>
                    <AvatarFallback>TG</AvatarFallback>
                  </AvatarRoot>
                  <ListItemHeading style={{ paddingTop: "10px" }}>
                    Welcome {userName}!
                  </ListItemHeading>
                  <ListItemText>Member since 2023</ListItemText>
                </ListItem>
                <div style={{ paddingBottom: "20px", paddingTop: "10px" }}>
                  <Button className="bg-red-400" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
                <SeparatorRoot css={{ margin: "15px 0" }} />
                {isInBeta ? (
                  <ListItemLink variant="success">
                    <ListItemText style={{ color: "whiteSmoke" }}>
                      <CheckCircle2
                        className="mr-2"
                        color="green"
                        size={35}
                        style={{ display: "inline" }}
                      />
                      You Are Enrolled!
                    </ListItemText>
                    <div>
                      <Button variant="link2" size="sm" onClick={leaveBeta}>
                        Opt Out
                      </Button>
                    </div>
                  </ListItemLink>
                ) : (
                  <ListItemLink variant="beta">
                    <ListItemText style={{ color: "whiteSmoke" }}>
                      Join our Early Access Program!
                    </ListItemText>
                    <div style={{ paddingTop: "10px" }}>
                      <Button onClick={enterBeta}>Enroll</Button>
                    </div>
                  </ListItemLink>
                )}
              </List>
            </NavigationMenuContent>
          </NavigationMenuTrigger>
        </AlertDialogTrigger>
      </AlertDialog.Root>
    );
  }
}

const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: slate.slate7,
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 },
});

const AlertDialogTrigger = styled(AlertDialog.Trigger, {
  all: "unset",
});

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

const itemStyles = {
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

const NavigationMenuContent = styled(NavigationMenu.Content, {
  position: "absolute",
  zIndex: 999,
  top: 0,
  left: 0,
  width: "100%",
  "@media only screen and (min-width: 400px)": { width: "auto" },
  animationDuration: "250ms",
  animationTimingFunction: "ease",
  '&[data-motion="from-start"]': { animationName: enterFromLeft },
  '&[data-motion="from-end"]': { animationName: enterFromRight },
  '&[data-motion="to-start"]': { animationName: exitToLeft },
  '&[data-motion="to-end"]': { animationName: exitToRight },
});

const NavigationMenuTrigger = styled(NavigationMenu.Trigger, {
  all: "unset",
  ...itemStyles,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 999,
  gap: 2,
});

const List = styled("ul", {
  display: "grid",
  paddingBottom: 5,
  margin: 5,
  alignItems: "center",
  textAlign: "center",
  zIndex: 999,
  columnGap: 10,
  listStyle: "none",
  variants: {
    layout: {
      one: {
        "@media only screen and (min-width: 300px)": {
          width: 400,
          gridTemplateColumns: "1fr",
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

const ListItemLink = styled("div", {
  display: "inline",
  outline: "none",
  textDecoration: "none",
  userSelect: "none",
  padding: 12,
  alignItems: "stretch",
  borderRadius: 6,
  fontSize: 15,
  lineHeight: 1,
  "&:focus": { boxShadow: `0 0 0 2px ${grayDark.gray7}` },
  variants: {
    variant: {
      beta: {
        backgroundColor: cyan.cyan8,
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 20,
      },
      success: {
        backgroundColor: green.green7,
        alignItems: "baseline",
        verticalAlign: "middle",
        fontSize: 20,
      },
    },
  },
});

const ListItemHeading = styled("div", {
  fontWeight: 700,
  fontSize: 20,
  lineHeight: 1.2,
  marginBottom: 5,
});

const ListItemText = styled("p", {
  all: "unset",
  color: mauve.mauve11,
  lineHeight: 1.4,
  fontWeight: "initial",
  paddingBottom: 10,
});

const CaretDown = styled(CaretDownIcon, {
  position: "relative",
  color: blueDark.blue10,
  top: 1,
  transition: "transform 250ms ease",
  "[data-state=open] &": { transform: "rotate(-180deg)" },
});

const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  width: 150,
  height: 150,
  borderRadius: "100%",
  backgroundColor: blackA.blackA3,
});

const AvatarImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  color: violet.violet11,
  fontSize: 40,
  lineHeight: 1,
  fontWeight: 500,
});
