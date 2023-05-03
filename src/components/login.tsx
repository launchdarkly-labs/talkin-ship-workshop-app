// @ts-nocheck
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { styled } from "@stitches/react";
import { useState, useContext, useRef } from "react";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { setCookie, setCookies } from "cookies-next";
import { deleteCookie } from "cookies-next";
import { Login_data } from "@/context/state";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCookie } from "cookies-next";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function Login() {
  const inputRef = useRef();
  const { isLoggedIn, setIsLoggedIn } = useContext(Login_data);
  const [handleModal, setHandleModal] = useState(false);
  const ldclient = useLDClient();

  function handleLogin(e: Event) {
    e.preventDefault();
    setIsLoggedIn(true);
    const context: any = ldclient?.getContext();
    console.log(context);
    context.user.name = inputRef.current.value;
    ldclient?.identify(context);
    setCookie("ldcontext", context);
    console.log(context);
    setHandleModal(false);
  }

  function handleLogout() {
    console.log("logout-happened");
    setIsLoggedIn(false);
    const context: any = ldclient?.getContext();
    context.user.name = "Anonymous";
    ldclient?.identify(context);
    setCookie("ldcontext", context);
  }

  if (getCookie("ldcontext") === undefined) {
    const context: any = ldclient?.getContext();
    setCookie("ldcontext", context);
  }

  if (!isLoggedIn) {
    return (
      <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xl bg-black hover:bg-blue-400/90 text-white" variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px] font-sans", fontSans.variable)}>
        <DialogHeader>
          <DialogTitle>Login to Toggle Outfitters</DialogTitle>
          <DialogDescription>
            Because we need to know you, to send you things.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input id="name" className="col-span-3" required ref={inputRef} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input id="username" type='password' className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-green-500" type="submit" onClick={(e) => handleLogin(e)}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
)} else {
    return (
      <AlertDialog.Root>
        <AlertDialogTrigger>
          <Button className="text-xl text-white" variant='destructive' onClick={handleLogout}>
            Logout
          </Button>
        </AlertDialogTrigger>
      </AlertDialog.Root>
    );
  }
}

const AlertDialogTrigger = styled(AlertDialog.Trigger, {
  all: "unset",
});
