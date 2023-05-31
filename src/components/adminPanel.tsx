import * as React from "react";
import { useFlags } from "launchdarkly-react-client-sdk";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { Table } from "@nextui-org/react";
import product from "@/config/products";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";

type inventory = {
    id: number;
    toggle_name: string;
    price: string;
    description: string;
  };
  
  type orders = {
    name: string;
    email: string;
  };
  
  type product = {
    name: string;
    table_price: string;
    inventory: number;
  };

export default function AdminPanel() {
    const { adminMode, dbTesting } = useFlags();

  const [inventory, setInventory] = React.useState<any>([]);

  const getInventory = async () => {
    try {
      const response = await fetch("/api/inventory");
      const jsonData = await response.json();
      setInventory(jsonData);
    } catch (error) {
      console.log("there was an error");
    }
  };

  React.useEffect(() => {
    getInventory();
    getOrders();
  }, [dbTesting]);

  function initialize() {
    getInventory();
    getOrders();
  }

  const [orders, setOrders] = React.useState<any>([]);
  const getOrders = async () => {
    try {
      const response = await fetch("/api/form");
      const jsonData = await response.json();
      setOrders(jsonData);
    } catch (error) {
      console.log("there was an error");
    }
  };
  return (
    <Dialog>
        {adminMode && 
      <DialogTrigger asChild>
        <Button onClick={(e) => initialize()} className="text-md xl:text-lg text-white" variant="outline">Store Admin</Button>
      </DialogTrigger>
      }
      <DialogContent className={cn("min-w-[80%] h-4/5 font-sohne bg-ldgray text-white", fontSans.variable)}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Store Inventory</DialogTitle>
          <DialogDescription>
            {dbTesting == "postgres" ? (
            <div className="mx-auto bg-ldred text-white w-1/3 p-3 shadow-xl font-sohnemono text-center text-xl">
            <p>Database Source Migrated</p>
            </div>
            ) : (
              <div className="mx-auto bg-black text-white w-1/3 p-3  font-sohnemono text-center text-xl">
            <p>Database Source Local</p>
            </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-auto">
        {dbTesting == "postgres" ? (
        <Table className="bg-ldgray">
          <TableHeader >
            <TableHead className="text-white">TOGGLE NAME</TableHead>
            <TableHead className="text-white">PRICE</TableHead>
            <TableHead className="text-white">DESCRIPTION</TableHead>
            <TableHead className="text-white">CURRENT INVENTORY</TableHead>
            <TableHead className="text-white">OUTSTANDING ORDERS</TableHead>
          </TableHeader>
          <TableBody>
            {inventory.map((inventory: inventory) => (
              <TableRow key="1">
                <TableCell>{inventory.toggle_name}</TableCell>
                <TableCell>{inventory.price}</TableCell>
                <TableCell>{inventory.description}</TableCell>
                <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
                <TableCell>{Math.floor(Math.random() * 10)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>):(
          <Table className="bg-ldgray">
            <TableHeader>
              <TableHead className="text-white">TOGGLE NAME</TableHead>
              <TableHead className="text-white">PRICE</TableHead>
              <TableHead className="text-white">CURRENT INVENTORY</TableHead>
            </TableHeader>
            <TableBody>
              {product.map((product: product) => (
                <TableRow key="1">
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.table_price}</TableCell>
                  <TableCell>{product.inventory}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        </div>
        {/* <DialogHeader>
          <DialogTitle>Order Submissions</DialogTitle>
          <DialogDescription>
            Requested contacts from submissions.
          </DialogDescription>
        </DialogHeader>
        <Table
          css={{
            backgroundColor: "white",
            alignContent: "center",
          }}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column>NAME</Table.Column>
            <Table.Column>EMAIL</Table.Column>
          </Table.Header>
          <Table.Body>
            {orders.map((orders: orders) => (
              <Table.Row key="1">
                <Table.Cell>{orders.name}</Table.Cell>
                <Table.Cell>{orders.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table> */}
      </DialogContent>
    </Dialog>
  );
}