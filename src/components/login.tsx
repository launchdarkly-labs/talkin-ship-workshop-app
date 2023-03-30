import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Form from "@radix-ui/react-form";
import PropTypes from "prop-types";
import { styled, keyframes } from "@stitches/react";
import {
  blackA,
  blueDark,
  slate,
  mauve,
  grass,
  red,
  whiteA,
} from "@radix-ui/colors";
import { useState, useEffect } from "react";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { setCookie } from "cookies-next";


export default function Login({ login }: { login: any }) {
  const [userTemporaryName, setTemporaryUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const ldclient = useLDClient();

  const updateUsername = (e: any) => {
    e.preventDefault();
    setTemporaryUserName(e.target.value);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger style={{ border: 0, margin: 2 }}>
         <Button>Login</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <FormRoot
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <AlertDialogTitle>Toggle Store Login</AlertDialogTitle>
            <FormField name="name">
              <Flex
                css={{
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <FormLabel>Username</FormLabel>
                <FormMessage match="valueMissing">
                  Please enter your name
                </FormMessage>
              </Flex>
              <Form.Control asChild>
                <Input type="username" required onChange={updateUsername} />
              </Form.Control>
            </FormField>
            <FormField name="password">
              <FormLabel>Password</FormLabel>
              <Form.Control asChild>
                <Input type="password" required />
              </Form.Control>
            </FormField>
            <Flex css={{ justifyContent: "flex-end" }}>
              <AlertDialog.Cancel asChild>
                <Button variant="blue" css={{ marginRight: 25 }}>
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <Form.Submit asChild>
                  <Button
                  variant="green"
                  onClick={() => {
                    login(userTemporaryName);
                    setLoggedIn(true)
                    console.log(userTemporaryName);
                    const context: any = ldclient?.getContext()
                    context.user.name = userTemporaryName
                    ldclient?.identify(context)
                    setCookie('user', userTemporaryName)
                    console.log(context)
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
  );
}

Login.propTypes = {
  login: PropTypes.func,
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
  fontFamily: "inter",
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
  fontSize: 24,
  fontFamily: "Sohne",
  fontWeight: 500,
});

const Flex = styled("div", { display: "flex" });

const Button = styled("button", {
  all: "unset",
  display: "block",
  textDecoration: "none",
  padding: "6px 12px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  fontSize: 15,
  fontFamily: "Sohne",
  color: blueDark.blue10,

  variants: {
    variant: {
      black: {
        backgroundColor: "black",
        color: blueDark.blue10,
        "&:hover": { backgroundColor: blueDark.blue3 },
        "&:focus": { boxShadow: `0 0 0 2px ${blackA.blackA1}` },
      },
      red: {
        backgroundColor: red.red4,
        color: red.red10,
        "&:hover": { backgroundColor: red.red6 },
        "&:focus": { boxShadow: `0 0 0 2px ${red.red7}` },
      },
      green: {
        backgroundColor: grass.grass4,
        color: grass.grass11,
        "&:hover": { backgroundColor: grass.grass5 },
        "&:focus": { boxShadow: `0 0 0 2px ${grass.grass7}` },
      },
      blue: {
        backgroundColor: "white",
        color: blueDark.blue1,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: slate.slate7 },
        "&:focus": { boxShadow: `0 0 0 2px ${whiteA.whiteA1}` },
      },
    },
  },

  defaultVariants: {
    variant: "black",
  },
});
