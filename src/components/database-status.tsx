import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { styled, keyframes } from '@stitches/react';
import { violet, blackA, tomatoDark, slate, grass } from '@radix-ui/colors';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { CheckCircledIcon } from '@radix-ui/react-icons';


const DatabaseState = () => {
  const { dbTesting, releaseUpdatedStorefront } = useFlags();
  const [open, setOpen] = React.useState(true);

  const ToastRoot = styled(Toast.Root, {
    backgroundColor: (dbTesting == 'postgres') ? grass.grass10 : tomatoDark.tomato11,
    borderRadius: 6,
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    padding: 15,
    display: 'grid',
    gridTemplateAreas: '"title action" "description action"',
    gridTemplateColumns: 'auto max-content',
    columnGap: 15,
    alignItems: 'center',
    textAlign: 'center',
  });

  return (
    <>
      {releaseUpdatedStorefront ?
        <Toast.Provider swipeDirection="right">
          <ToastRoot open={open}>
            <ToastTitle>Connected Database <u><strong>{dbTesting}</strong></u></ToastTitle>
          </ToastRoot>
          <ToastViewport />
        </Toast.Provider>
        : null}
    </>
  );
};

const VIEWPORT_PADDING = 25;

const ToastViewport = styled(Toast.Viewport, {
  position: 'relative',
  // bottom: 0,
  // right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: '25vw',
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  // zIndex: 2147483647,
  outline: 'none',
});

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const ToastTitle = styled(Toast.Title, {
  gridArea: 'title',
  marginBottom: 0,
  fontWeight: 500,
  color: slate.slate1,
  fontSize: 20,
  fontFamily: 'Sohne',
});

export default DatabaseState;