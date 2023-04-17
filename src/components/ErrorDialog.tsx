import {
    FormRoot,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogTitle,
    Flex,
    Button,
  } from './component-library';
  import * as AlertDialog from "@radix-ui/react-alert-dialog";
  


const ErrorDialog = ({ errorState, setErrorState }: any) => {
  return (
    <AlertDialog.Root defaultOpen={true}>
      <AlertDialog.Trigger />
      {errorState && (
        <AlertDialog.Portal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <FormRoot
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <AlertDialogTitle>Uh oh! Looks like an error!</AlertDialogTitle>
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
      )}
    </AlertDialog.Root>
  );
};

export default ErrorDialog;
