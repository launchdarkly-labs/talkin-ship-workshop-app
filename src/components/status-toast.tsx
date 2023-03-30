import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { styled, keyframes } from '@stitches/react';
import { violet, blackA, mauve, slate, green } from '@radix-ui/colors';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { CheckCircledIcon } from '@radix-ui/react-icons';

const BillingState = () => {
    const [open, setOpen] = React.useState(true);
    const {billing, storeEnabled} = useFlags();
    const [billingPath, setBillingPath] = React.useState("");


React.useEffect(() => {
if (billing) {
    setBillingPath("Stripe")
}
else {
    setBillingPath("Self Hosted")
}
},[billing]);

  return (
    <>
    { storeEnabled ?
    <Toast.Provider swipeDirection="right"> 
      <ToastRoot open={open}>
        <ToastTitle>Currently using <u><strong>{billingPath}</strong></u></ToastTitle>
        <CheckCircledIcon color="green" style={{height: '30px', width: '30px'}}/>
      </ToastRoot>
      <ToastViewport />
    </Toast.Provider>
 : null}
      </>
  );
};

const VIEWPORT_PADDING = 25;

const ToastViewport = styled(Toast.Viewport, {
  position: 'sticky',
  bottom: 0,
  center: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 395,
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,
  outline: 'none',
});

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const ToastRoot = styled(Toast.Root, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  padding: 15,
  display: 'grid',
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: 'auto max-content',
  columnGap: 15,
  alignItems: 'center',
});

const ToastTitle = styled(Toast.Title, {
  gridArea: 'title',
  marginBottom: 0,
  fontWeight: 500,
  color: slate.slate12,
  fontSize: 20,
  // fontFamily: 'inter',
});

export default BillingState;