import { useState } from 'react';
import { EmailField, NameField } from '../FormFields';
import {
    FormRoot,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    Flex,
    Button,
  } from '../component-library'; 
  import * as AlertDialog from "@radix-ui/react-alert-dialog";
  import * as Form from "@radix-ui/react-form";

  
  const ReserveButton = ({
    setHandleModal,
    handleModal,
    handleClickTest,
    updateField,
    formData,
    onButtonClick,
    experimentData,
  }: any) => {
    const { name, email } = formData;
  
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button className='grid my-4 bottom-0 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border  rounded-xl'
            onClick={() => {
              setHandleModal(true);
              experimentData();
            }}
          >
            Reserve Yours!
          </button>
        </AlertDialog.Trigger>
        {handleModal && (
          <AlertDialog.Portal>
            <AlertDialogOverlay />
            <AlertDialogContent>
              <FormRoot onSubmit={handleClickTest}>
                <AlertDialogTitle>
                  Thanks for your interest in our Toggles!
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Please provide your contact info and our Toggle
                  Specialists will contact you in 3-5 business days
                </AlertDialogDescription>
                <NameField
                value={name}
                onChange={(event) => updateField("name", event)}
              />
              <EmailField
                value={email}
                onChange={(event) => updateField("email", event)}
              />
                <Flex css={{ justifyContent: "flex-end" }}>
                  <AlertDialog.Cancel asChild>
                    <Button css={{ marginRight: 25 }}>Cancel</Button>
                  </AlertDialog.Cancel>
                  <Form.Submit asChild onSubmit={(e) => handleClickTest(e)}>
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
        )}
      </AlertDialog.Root>
    );
  };
  
  export default ReserveButton;
  