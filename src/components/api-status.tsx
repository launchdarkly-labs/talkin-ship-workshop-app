import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { styled, keyframes } from '@stitches/react';
import { slate, grass, tomatoDark } from '@radix-ui/colors';
import { useFlags } from 'launchdarkly-react-client-sdk';

const APIMigrationState = () => {
  const [open, setOpen] = React.useState(true);
  const { updatedBillingUi, releaseUpdatedStorefront } = useFlags();
  const [billingPath, setBillingPath] = React.useState("");


  React.useEffect(() => {
    if (updatedBillingUi) {
      setBillingPath("Migrated")
    }
    else {
      setBillingPath("Self-Hosted")
    }
  }, [updatedBillingUi]);

  const ToastRoot = styled(Toast.Root, {
    backgroundColor: (updatedBillingUi ? grass.grass10 : tomatoDark.tomato11),
    borderRadius: 6,
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    padding: 15,
    gridTemplateAreas: '"title action" "description action"',
    gridTemplateColumns: 'auto max-content',
    display: 'grid',
    width: '15vw',
    columnGap: 15,
    alignItems: 'center',
    textAlign: 'center',
  });

  const ToastTitle = styled(Toast.Title, {
    gridArea: 'title',
    marginBottom: 0,
    fontWeight: 500,
    color: slate.slate1,
    fontSize: 20,
    fontFamily: 'Sohne'
  });

  const VIEWPORT_PADDING = 5;

  const ToastViewport = styled(Toast.Viewport, {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '15vw',
    textAlign: 'center',
    listStyle: 'none',
    outline: 'none',
  });

  const hide = keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
  });

  return (
    <>
      {releaseUpdatedStorefront ?
        <Toast.Provider swipeDirection="right">
          <ToastRoot open={open}>
            <ToastTitle>Billing API status is <u><strong>{billingPath}</strong></u></ToastTitle>
          </ToastRoot>
          <ToastViewport />
        </Toast.Provider>
        : null}
    </>
  );
};

export default APIMigrationState;