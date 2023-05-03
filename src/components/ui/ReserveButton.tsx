import { useState } from "react";
import { EmailField, NameField } from "./FormFields";
import {
  FormRoot,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  Flex,
} from "../component-library";
import { Button } from "@/components/ui/button";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Form from "@radix-ui/react-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";


const ReserveButton = ({
  setHandleModal,
  handleModal,
  handleClickTest,
  updateField,
  formData,
  onButtonClick,
}: any) => {
  const { name, email } = formData;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="grid my-4 bottom-0 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 "
          onClick={() => {
            setHandleModal(true);
          }}
        >
          Reserve Yours!
        </Button>
      </DialogTrigger>
      {handleModal && (
      <DialogContent className={cn("sm:max-w-[425px] font-sans", fontSans.variable)}>
        <DialogHeader>
          <DialogTitle>Thanks for your interest in our Toggles!</DialogTitle>
          <DialogDescription>
            Please provide your contact info and our Toggle Specialists will
            contact you in 3-5 business days
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} className="col-span-3" onChange={(event) => updateField("name", event)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email Address
            </Label>
            <Input id="email" value={email} className="col-span-3" onChange={(event) => updateField("email", event)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={(e) => {
            handleClickTest(e)
            onButtonClick()
          }}>Submit</Button>
        </DialogFooter>
      </DialogContent>
      )}
    </Dialog>
    // <AlertDialog.Root>
    //   <AlertDialog.Trigger>
    //     <button className='grid my-4 bottom-0 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border rounded-xl'
    //       onClick={() => {
    //         setHandleModal(true);

    //       }}
    //     >
    //       Reserve Yours!
    //     </button>
    //   </AlertDialog.Trigger>
    //   {handleModal && (
    //     <AlertDialog.Portal>
    //       <AlertDialogOverlay />
    //       <AlertDialogContent>
    //         <FormRoot onSubmit={handleClickTest}>
    //           <AlertDialogTitle>
    //             Thanks for your interest in our Toggles!
    //           </AlertDialogTitle>
    //           <AlertDialogDescription>
    //             Please provide your contact info and our Toggle
    //             Specialists will contact you in 3-5 business days
    //           </AlertDialogDescription>
    //           <NameField
    //           value={name}
    //           onChange={(event) => updateField("name", event)}
    //         />
    //         <EmailField
    //           value={email}
    //           onChange={(event) => updateField("email", event)}
    //         />
    //           <Flex css={{ justifyContent: "flex-end" }}>
    //             <AlertDialog.Cancel asChild>
    //               <Button css={{ marginRight: 25 }}>Cancel</Button>
    //             </AlertDialog.Cancel>
    //             <Form.Submit asChild onSubmit={(e) => handleClickTest(e)}>
    //               <Button
    //                 variant="green"
    //                 onClick={() => {
    //                   onButtonClick();
    //                 }}
    //               >
    //                 Submit
    //               </Button>
    //             </Form.Submit>
    //           </Flex>
    //         </FormRoot>
    //       </AlertDialogContent>
    //     </AlertDialog.Portal>
    //   )}
    // </AlertDialog.Root>
  );
};

export default ReserveButton;
