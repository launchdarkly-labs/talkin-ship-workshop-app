import { Button } from "@/components/ui/button";
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
  );
};

export default ReserveButton;
